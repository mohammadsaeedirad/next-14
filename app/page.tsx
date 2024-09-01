import { asyncGetAllBooks } from './service/Book';
import BooksTable from '@/components/home/booksTable';
import BooksItem from '@/components/home/booksItem';
export const revalidate = 0;
export const dynamic = 'force-dynamic';
export default async function Home() {
  try {
    const books = await asyncGetAllBooks();
    return (
      <main className="flex min-h-screen flex-col md:mx-2">
       <div className='hidden xl:block' >
       <BooksTable books={books} />
      </div> 
      <div className='block xl:hidden' >
       <BooksItem books={books} />
      </div> 
      </main>
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
 
}
