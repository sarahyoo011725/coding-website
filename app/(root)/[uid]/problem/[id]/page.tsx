import React, { Suspense } from 'react'
import DefaultAnalysis from './DefaultAnalysis';
import Loading from './Loading';
import { Problem } from '@/app/types';
import AiAnalysis from './AiAnalysis';
import DeleteButton from './DeleteButton';

const fetchProblem = async (uid: string, id: string): Promise<Problem> => {
  const res = await (await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/${uid}/problem/${id}`)).json();
  const data = await res.data;
  return data as Problem;
};

const page = async ({ params }: { params: Promise<{ uid: string; id: string }> }) => {
  const { uid, id } = await params;
  const problem = await fetchProblem(uid, id);

  return (
    <div className="h-full bg-slate-200">
      <section className="grid lg:grid-cols-2 gap-4 md:p-10">
        <DefaultAnalysis problem={problem}/>

        <Suspense fallback={<Loading />}>
          <AiAnalysis problem={problem} uid={uid} />
        </Suspense>
      </section>
      <DeleteButton uid={uid} id={id}/>
    </div>
  );
};

export default page;