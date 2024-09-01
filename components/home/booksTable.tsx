'use client' 
import { FC, ChangeEvent, useState, useEffect } from 'react';
import { BookResponse, BookType } from '@/app/Models/Book';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { asyncDeleteBook } from '@/app/service/Book';
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

interface BookListProps {
    books: BookResponse;
  }
const BooksTable: FC<BookListProps>  = ({books}) => {
    const router = useRouter();
    const [booksData, setBooksData] = useState<BookResponse>(books);
    async function handleDeleteBook(book : BookType) {
        try {
          await asyncDeleteBook(book);
          toast({
            title: 'Book removed successfully ;)',
          })
        } catch (error) {
            toast({
                variant: "destructive",
                title:'failed to remove book :(',
              })
        }
      };
    function handleSearchBooks(e: ChangeEvent<HTMLInputElement>){
        books.map(book => {
            if(book?.title.toLowerCase().includes(e.target.value.toLowerCase()))
            return book
        } )
        const keyword = e.target.value;

        if (keyword !== '') {
          const results = books.filter((book) => {
            return book.title.toLowerCase().includes(keyword.toLowerCase());
          });
          setBooksData(results);
        } else {
            setBooksData(books);
        }
    } 
    function handleSortByPublishedYear() {
        const sortedBooks = [...booksData].sort((a, b) => b.publishedYear - a.publishedYear);
        setBooksData(sortedBooks);
      }
   useEffect(() => {
      setBooksData(books);
   }, [books])
   
    
  return (
    <div className="flex flex-col m-10">
    <div className='flex flex-row justify-between my-2 space-x-2' >
        <Button  onClick={()=>router.push('/submit-book')} >Add Book</Button>
        <Button  onClick={handleSortByPublishedYear} >Sort by publishedYear</Button>

        <Input onChange={(e)=>handleSearchBooks(e)} type="email" placeholder="Search by title" />
    </div>
    <div className="overflow-x-auto bg-gray-100">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-left text-sm font-light text-surface">
          <thead
            className="border-b border-neutral-200 font-medium bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4">id</th>
              <th scope="col" className="px-6 py-4">title</th>
              <th scope="col" className="px-6 py-4">author</th>
              <th scope="col" className="px-6 py-4">description</th>
              <th scope="col" className="px-6 py-4">publishedYear</th>
              <th scope="col" className="px-6 py-4">edit</th>
              <th scope="col" className="px-6 py-4">remove</th>
            </tr>
          </thead>
          <tbody>
            {booksData?.map((book)=>{
                return(
                    <tr key={book.id} className="border-b border-neutral-200">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{book?.id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{book?.title || '--'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{book?.author || '--'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{book?.description || '--'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{book?.publishedYear || '--'}</td>
                        <td onClick={()=>{router.push(`/edit-book/${book?.id}`)}} className="whitespace-nowrap px-6 py-4 cursor-pointer text-yellow-500 font-bold">Edit</td>
                        <td onClick={()=>handleDeleteBook(book)} className="whitespace-nowrap px-6 py-4 cursor-pointer text-red-500 font-bold">Remove</td>
                    </tr>
                )
            })}
           
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default BooksTable