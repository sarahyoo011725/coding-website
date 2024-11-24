import { Problem, ProblemStatus } from '@/app/types';
import ProblemColumn from '../ProblemColumn';

const page = async ({ params } : { params: Promise<{ uid: string }>}) => {
  const { uid } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/problem/${uid}`);

  const result = await res.json();
  const problems = result.data as Problem[];

  const filterProblemsByStatus = (status: ProblemStatus) => {
    return problems.filter(p => p.status === status);
  }
  return (
    <>
      <section  className='flex gap-4 justify-center bg-gray-200 pt-8 h-full'>
        <ProblemColumn type={ProblemStatus.JustSolved} problems={filterProblemsByStatus(ProblemStatus.JustSolved)} uid={uid}/>
        <ProblemColumn type={ProblemStatus.StillHard} problems={filterProblemsByStatus(ProblemStatus.StillHard)} uid={uid}/>
        <ProblemColumn type={ProblemStatus.NeedsToReview} problems={filterProblemsByStatus(ProblemStatus.NeedsToReview)} uid={uid}/>
        <ProblemColumn type={ProblemStatus.JustReviewd} problems={filterProblemsByStatus(ProblemStatus.JustReviewd)} uid={uid}/>
        <ProblemColumn type={ProblemStatus.EasyNow} problems={filterProblemsByStatus(ProblemStatus.EasyNow)} uid={uid}/>
      </section>
    </>
  )
}

export default page