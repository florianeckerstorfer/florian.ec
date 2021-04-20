---
permalink: blog/react-file-upload-jest/
title: 'Testing a React file upload component with Jest'
date: 2020-10-08
category: Development
tags: [react, jest, typescript]
description: 'We are creating a simple React file upload component, test it with Jest and refactor it to make testing easier. We are also mocking FileReader.'
---

A few days ago I implemented a simple React component to upload files. I started to think how to properly test the component with Jest, which includes mocking `FileReader`. In this article I am going to demonstrate how to write test cases for such a component, including some refactoring to make the component easier to test and a mock of `FileReader`.

All code examples are written in TypeScript, and we will use [Jest](https://jestjs.io) with [Enzyme](https://github.com/enzymejs/enzyme/) and [jest-enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme) matchers in our tests.

## A simple file upload component

Let’s begin with a simple file upload component: a label, an input field and a preview if a file has been selected and stored in the components state.

```tsx
// FileUploadField.tsx

function FileUploadField(): ReactElement {
  const [preview, setPreviewImage] = useState<string | undefined>();
  const previewStyle = { width: '200px' };

  const handleChange = useCallback(({ target }) => {
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      if (reader.result) {
        setPreviewImage(reader.result as string);
      }
    });
    reader.readAsDataURL(target.files[0]);
  }, []);

  return (
    <div>
      <label htmlFor="fileUpload">Upload file:</label>
      <input type="file" id="fileUpload" onChange={handleChange} />
      {preview && (
        <div>
          <img src={preview} alt="Preview" style={previewStyle} />
        </div>
      )}
    </div>
  );
}
```

Just to make this clear, this is a simplified version of a file upload component. In a real application we would add error handling and the code would do something with the selected file (for example, upload it to a server).

Before we start refactoring and writing tests we should think about all the possible test cases that we need:

- A label and an input field should be visible.
- The ID of the input field should match the label to [make the form accessible](https://webaim.org/articles/label-name/#labelBest).
- If no image is selected, the preview should _not_ be visible.
- If a file is selected (the `onChange` event) successfully, the preview _is_ visible and shows the selected image.

We can immediately start writing the first three test cases:

```tsx
// FileUploadField.test.tsx

describe('FileUploadField', () => {
  const component = shallow(<FileUploadField />);

  it('should render a label and a file input field', () => {
    expect(component.find('input[type="file"]')).toExist();
    expect(component.find('label')).toExist();
  });

  it('should attach the label to the input field', () => {
    const id = 'fileUpload';
    expect(component.find('label').prop('htmlFor')).toBe(id);
    expect(component.find('input').prop('id')).toBe(id);
  });

  it('should not show preview if no image has been selected', () => {
    expect(component.find('img')).not.toExist();
  });
});
```

Testing the file selection is harder and we will refactor our component a bit to make testing easier. The best refactoring we can do here is to move all logic that is not directly related to rendering the component into a separate function. In addition to making it easier to test the component we will also increase the readability of our component and our business logic.

## Separating the logic from the component

In this case we are going to move the `FileReader` logic into a separate function. We will call the function `readFileAsDataURL` and it takes a `File` object (which is the type of `target.files[0]` in the code above) and returns a promise that resolves with the data URL as string. With this refactoring, we can test the logic of reading the file separately from the component logic and we can mock `readFileAsDataURL()` when we test our component and do not concern ourselves with the file reading logic there. Here is the code:

```typescript
// readFileAsDataURL.ts

async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      if (reader.result) {
        resolve(reader.result as string);
      }
    });
    reader.readAsDataURL(file);
  });
}
```

## Testing the logic

When we consider the success case (the file is loaded) we need to check if the promise resolves the result. To simulate the `load` event we need to mock `FileReader` and overwrite `addEventListener` with a mock implementation, which immediately invokes the given listener. Since resolving the promise is now independent of the actual event we also want to make sure that `readAsDataURL()` is called.

But first things first, because we use TypeScript we need to create a class with all properties and methods of `FileReader` and replace `FileReader` with it:

```typescript
// readFileAsDataURL.test.ts

class FileReaderMock {
  DONE = FileReader.DONE;
  EMPTY = FileReader.EMPTY;
  LOADING = FileReader.LOADING;
  readyState = 0;
  error: FileReader['error'] = null;
  result: FileReader['result'] = null;
  abort = jest.fn();
  addEventListener = jest.fn();
  dispatchEvent = jest.fn();
  onabort = jest.fn();
  onerror = jest.fn();
  onload = jest.fn();
  onloadend = jest.fn();
  onloadprogress = jest.fn();
  onloadstart = jest.fn();
  onprogress = jest.fn();
  readAsArrayBuffer = jest.fn();
  readAsBinaryString = jest.fn();
  readAsDataURL = jest.fn();
  readAsText = jest.fn();
  removeEventListener = jest.fn();
}
```

Now we have everything in place to test `readFileAsDataURL()`. First we set up the mocks, then we call the function and await the result. Lastly we expect that the function returns the content of the file and that `FileReader.readAsDataURL()` has been called with the given file.

```typescript
// readFileAsDataURL.test.ts

describe('readFileAsDataURL()', () => {
  const file = new File([new ArrayBuffer(1)], 'file.jpg');
  const fileReader = new FileReaderMock();
  jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve file as data URL', async () => {
    fileReader.result = 'file content';
    fileReader.addEventListener.mockImplementation((_, fn) => fn());

    const content = await readFileAsDataURL(file);

    expect(content).toBe('file content');
    expect(fileReader.readAsDataURL).toHaveBeenCalledTimes(1);
    expect(fileReader.readAsDataURL).toHaveBeenCalledWith(file);
  });
});
```

As already mentioned above, in a real world application we would add error handling and the corresponding tests. The tests will follow the same schema, a mock implementation of `addEventListener()` that is immediately invoked, but instead of resolving the result we would throw the error.

## Updating the component and testing file selection

In our `FileUploadField` we can now replace the `handleChange` callback with a call to our new function `readFileAsDataURL()`:

```tsx
// FileUploadField.tsx

const handleChange = useCallback(({ target }) => {
  async function doFileRead() {
    const result = await readFileAsDataURL(target.files[0]);
    setPreviewImage(result as string);
  }
  doFileRead();
}, []);
```

Because `useCallback()` cannot be asynchronous, we need to wrap our function call in another `async` function. We can now write the final test case: _if a file is selected (the `onChange` event) successfully, read the image should be shown in the preview_.

```tsx
// FileUploadField.test.tsx

import * as ReadFileAsDataURL from './readFileAsDataURL';

// ...

it('should render preview after image has been selected', () => {
  const file = new File([new ArrayBuffer(1)], 'file.jpg');

  const readFileMock = jest
    .spyOn(ReadFileAsDataURL, 'default')
    .mockResolvedValue('image content');

  component.find('input').simulate('change', { target: { files: [file] } });

  expect(readFileMock).toHaveBeenCalledTimes(1);
  expect(readFileMock).toHaveBeenCalledWith(file);

  setImmediate(() => {
    expect(component.find('img').prop('src')).toBe('image content');
  });
});
```

There are three things of note here:

- We need to import from `readFileAsDataURL.ts` with the `import * as ` syntax because `jest.spyOn()` expects an object and a function name.
- After we trigger the `change` event we first check if our mock has been called. In unit tests we test each component, function or class in isolation, however, we need to make sure the units are correctly called.
- Because we use an `async` function in the event handler we need to wait for an event cycle until React updates the component. In this example we use `setImmediate()`, but there are other ways to achieve this.

## Conclusion

In this article we created a simple file upload component, then refactored it to make it easier to test and finally added extensive tests for our component and helper function. We also created a mock of `FileReader` that we can also use in other tests.
