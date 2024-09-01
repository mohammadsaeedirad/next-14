'use client' 
import { FC, ChangeEvent, useState, useEffect } from 'react';
import { BookResponse, BookType } from '@/app/Models/Book';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { asyncDeleteBook } from '@/app/service/Book';
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
interface BookListProps {
    books: BookResponse;
  }
const BooksItem: FC<BookListProps>  = ({books}) => {
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
    <div className="flex flex-col m-2 sm:m-4">
    <div className='flex flex-col-reverse xl:flex-row justify-between my-6 space-x-2' >
        <div className='flex flex-row justify-between space-x-2 lg:m-0 m-2'  >
        <Button  onClick={()=>router.push('/submit-book')} >Add Book</Button>
        <Button  onClick={handleSortByPublishedYear} >Sort by publishedYear</Button>
        </div>
        <div className='flex flex-row justify-between xl:my-0 my-2' >
        <Input onChange={(e)=>handleSearchBooks(e)} type="email" placeholder="Search by title" />
        </div>
        
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' >
        {booksData.map((book)=>{
            return(
                <Card key={book?.id} >
                <CardHeader>
                    <CardTitle className='truncate' >{book?.title || "No Title" }</CardTitle>
                    <CardDescription className='truncate' >author:{book?.author || "No Author" }</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='truncate' >{book?.description || "No description" }</p>
                    
                </CardContent>
                <CardFooter className='flex flex-row justify-between'>
                    <div className='flex flex-row space-x-2' >
                    <Button onClick={()=>{router.push(`/edit-book/${book?.id}`)}} className="whitespace-nowrap px-6 py-4 cursor-pointer text-yellow-500 font-bold">Edit</Button>
                    <Button onClick={()=>handleDeleteBook(book)} className="whitespace-nowrap px-6 py-4 cursor-pointer text-red-500 font-bold">Remove</Button>
                    </div>
                    
                    <p>{book?.publishedYear || "No description" }</p>
                    
                </CardFooter>
                </Card>
            )
        })}
    </div>
</div>
  )
}

export default BooksItem