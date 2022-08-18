export type Post = {
  id?: string;
  title: string;
  description: string;
};

export type State = {
  posts: Array<Post>;
  loading: boolean;
};
