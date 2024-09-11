"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { getYear } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { asyncAddBook } from "@/app/service/Book"

const year = getYear();
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }).max(50, {
    message: "title must be maximum 50 characters.",
  }),
  author:z.string().max(50, {
    message: "author must be maximum 50 characters.",
  }),
  description:z.string().max(500, {
    message: "description must be maximum 500 characters.",
  }),
  publishedYear:z.coerce.number().lte(year)
})

export function SubmitBookForm({book, bookId}:{book:object, bookId:string}) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      author:'',
      description:'',
     
    },
  })
  async function getBook (){
    const { reset } = form
    reset(book);
  }
  useEffect(() => {
    if(book){
      getBook()
    }
  }, [])
  async function onSubmit(data: z.infer<any>) {
    setLoading(true)
      try {
        await asyncAddBook(bookId ? {...data,id:bookId}:data);
        setLoading(false)
        toast({
          title: 'Book added successfully ;)',
        })
        router.push('/')
      } catch (error: any) {
        setLoading(false)
        toast({
          variant: "destructive",
          title:'failed to add book :(',
        })
      }     
  }

  return (
    <div className="flex flex-col sm:self-center sm:w-[500px]" >
    <h1 className="text-center mt-20 text-xl" >Sumbit book</h1>
    <div className="mx-0  flex justify-center align-center" >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="author" {...field} />
              </FormControl>
              <FormDescription>
                This is your book author name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
              <Textarea placeholder="description..." {...field} />
              </FormControl>
              <FormDescription>
                This is your book description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />  
        <FormField
          control={form.control}
          name="publishedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PublishedYear</FormLabel>
              <FormControl>
                <Input className="decorator-none[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="publishedYear" type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is your book publishedYear.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <div className="flex flex-row space-x-2 justify-end" >
        <Button type="button"  onClick={()=>router.push('/')} className="bg-destructive" >cancel</Button>
        <Button disabled={loading} type="submit">Submit</Button>
        </div>   
        

      </form>
    </Form>
    </div>
    </div>
  
    
  )
}
