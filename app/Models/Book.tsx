export interface BookType {
  id: string;
  title: string;
  author:string;
  description:string;
  publishedYear:number;
}

export type BookResponse = BookType[];
