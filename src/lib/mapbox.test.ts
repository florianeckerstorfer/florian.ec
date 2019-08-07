import { loadMap, hasImage, loadImage, createMap } from './mapbox';
import MapboxGl from 'mapbox-gl';

jest.mock('mapbox-gl');

describe('createMap()', () => {
  it('should create map', async () => {
    await createMap('secret');

    expect(MapboxGl.Map).toHaveBeenCalledTimes(1);
    expect(MapboxGl.accessToken).toBe('secret');
  });
});

describe('loadMap()', () => {
  it('should load the given map', async (): Promise<void> => {
    const onMock = jest.fn((_, cb) => cb());
    const mapMock = ({ on: onMock } as any) as MapboxGl.Map;

    await loadMap(mapMock);

    expect(onMock).toHaveBeenCalledTimes(1);
    expect(onMock.mock.calls[0][0]).toBe('load');
  });
});

describe('hasImage()', () => {
  it('should return if map has given image', () => {
    const hasImageMock = jest.fn();
    const mapMock = ({ hasImage: hasImageMock } as any) as MapboxGl.Map;

    hasImage(mapMock, 'foobar');

    expect(hasImageMock).toHaveBeenCalledTimes(1);
    expect(hasImageMock.mock.calls[0][0]).toBe('foobar');
  });
});

describe('loadImage()', () => {
  it('should load image and add it to map', async () => {
    const name = 'foobar';
    const url = '/foobar.png';
    const image = {};
    const loadImageMock = jest.fn((_, cb) => cb(undefined, image));
    const addImageMock = jest.fn();
    const mapMock = ({
      addImage: addImageMock,
      loadImage: loadImageMock,
    } as any) as MapboxGl.Map;

    const result = (await loadImage(mapMock, { name, url })) as any;

    expect(loadImageMock).toHaveBeenCalledTimes(1);
    expect(loadImageMock.mock.calls[0][0]).toBe(url);
    expect(addImageMock).toHaveBeenCalledTimes(1);
    expect(addImageMock.mock.calls[0][0]).toBe(name);
    expect(addImageMock.mock.calls[0][1]).toBe(image);
    expect(result.name).toBe(name);
    expect(result.image).toBe(image);
  });

  it('should throw error if it could not load image', async () => {
    expect.assertions(2);

    const origError = console.error;
    console.error = jest.fn();

    const error = { message: 'error' };
    const name = 'foobar';
    const url = '/foobar.png';
    const loadImageMock = jest.fn((_, cb) => cb(error, undefined));
    const mapMock = ({ loadImage: loadImageMock } as any) as MapboxGl.Map;

    try {
      await loadImage(mapMock, { name, url });
    } catch (err) {
      expect(err.message).toBe('error');
      expect(console.error).toHaveBeenCalledTimes(1);
    }

    console.error = origError;
  });
});
