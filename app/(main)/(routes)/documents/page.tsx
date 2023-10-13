"use client";
import Image from 'next/image';
import { useUser } from "@clerk/clerk-react";
import { Button } from '@/components/ui/button';
import {PlusCircle} from 'lucide-react';
import { useMutation } from 'convex/react';
import {api} from '@/convex/_generated/api';
import {toast} from 'sonner';

const DocumentsPage = () => {
    const { user } = useUser();

    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create ({title: "Untitled"});

        toast.promise(promise , {
            loading:"Creating a new note...",
            success:"New note Created!",
            error:"Failed to create a new note.",
        })
    }
    return ( 
        <>
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image 
                src="/empty.png"
                className='dark:hidden'
                alt='Empty Images No Project Made'
                height="300"
                width="300"
            />
            <Image 
                src="/empty-dark.png"
                className='hidden dark:block'
                alt='Empty Images No Project Made'
                height="300"
                width="300"
            />
            <h2 className='text-lg font-bold'>
            Welcome to {user?.firstName}&apos;s RaNotion 
                    <b className='text-bolder text-lg text-green-500 rounded-full'>.</b>
            </h2>
            <Button onClick={onCreate}>
                    <PlusCircle className='w-4 h-4 mr-2'/>
                    Create a note now
            </Button>
        </div>
        </>
     );
}
 
export default DocumentsPage;