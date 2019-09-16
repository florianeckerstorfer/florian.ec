import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GlobalWithFetchMock } from 'jest-fetch-mock';

Enzyme.configure({ adapter: new Adapter() });

(global as any).___loader = {
  enqueue: jest.fn(),
};

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
