export interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  tag: string;
  author?: { name: string };
  createdAt?: string;
}
