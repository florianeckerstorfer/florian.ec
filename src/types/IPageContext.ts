import IBlogNode from './IBlogNode';

export default interface IPageContext {
  previous: IBlogNode;
  next: IBlogNode;
}
