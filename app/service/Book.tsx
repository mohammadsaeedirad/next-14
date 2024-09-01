'use server';
import { AxiosResponse } from 'axios';
import { BookResponse, BookType } from '../Models/Book';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import baseApi from './BaseApi';

const asyncGetAllBooks = async (): Promise<BookResponse> => {

  try {
    const response: AxiosResponse<BookResponse> =
     await baseApi.get<BookResponse>('/books/');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const asyncGetBookById = async (id:string): Promise<BookResponse | any> => {

  try {
    const response: AxiosResponse<BookResponse> =
     await baseApi.get<BookResponse>(`/books/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const asyncAddBook = async (data: Partial<BookType>): Promise<void> => {
  try {
    await baseApi.post(`/books`, data);
    revalidatePath('/');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const asyncDeleteBook = async (data: Partial<BookType>): Promise<void> => {
  try {
    await baseApi.delete(`/books/${data.id}`);
    revalidatePath('/');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const asyncEditBook = async (data: BookType): Promise<void> => {
  try {
    await baseApi.patch(`/books/${data.id}`, {
      title:data?.title,
      author:data?.author,
      description:data?.description,
      publishedYear:data?.publishedYear
    });
    revalidatePath(`/`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  asyncGetAllBooks,
  asyncGetBookById,
  asyncAddBook,
  asyncDeleteBook,
  asyncEditBook,
};
