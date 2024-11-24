import React, { Suspense } from 'react'
import DefaultAnalysis from './DefaultAnalysis';
import AiAnalysis from './AiAnalysis';
import Loading from './Loading';

const page = async ({ params } : { params : Promise<{ uid:string, id: string }>}) => {
  const { uid, id } = await params;
  const res = (await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/problem/${uid}/${id}`));
  const result = await res.json();
  const data = result.data;
  
    return (
    <div className='h-full bg-slate-200'>
        <section className='grid lg:grid-cols-2 gap-4 md:p-10'>
          <DefaultAnalysis problem={data}/>
   
          <Suspense fallback={<Loading />}>
            <AiAnalysis problem={data}/>
          </Suspense>
        </section>
    </div>
  )
}

export default page