import Image from 'next/image';



export const  Heroes = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center max-w-5xl'>
                <div className="flex items-center">
                    <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                            <Image
                                src="/documents-dark.png"
                                fill
                                className='hidden object-contain dark:block'
                                alt='Heroes Images'
                            />  

                            <Image
                                src="/documents.png"
                                fill
                                className='object-contain dark:hidden'
                                alt='Heroes Images'
                            />  
                    </div>

                    <div className="relative h-[400px] w-[400px] hidden md:block">
                        <Image
                            className='hidden object-contain dark:block'
                            src="/reading-dark.png"
                            fill
                            alt='Reading Images'
                        />

                        <Image
                            className='object-contain dark:hidden'
                            src="/reading.png"
                            fill
                            alt='Reading Images'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}