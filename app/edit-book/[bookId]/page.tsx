import { SubmitBookForm } from '@/components/SumbitBook/form'
import { asyncGetBookById } from "@/app/service/Book"
import { Suspense } from 'react'
import Loading from "./loading"
export default async function SumbitBook({
  params: { bookId },
}: {
  params: { bookId: string }
}){
  try {
    const book = await asyncGetBookById(bookId);
    return (
      <main className="flex min-h-screen flex-col mx-2">
       <Suspense fallback={<Loading />}>
         <SubmitBookForm book={book} bookId={bookId} />
      </Suspense>
      </main  >
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
    
  }

