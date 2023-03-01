export interface IPost {
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  posts: IPost[];
  isPostLoading: boolean;
  isPostError: string;
  isPostDeleting?: boolean;
}
