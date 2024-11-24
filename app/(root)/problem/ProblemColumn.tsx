import { ProblemStatus, Problem } from "@/app/types";
import Link from "next/link";

interface PropsTypes {
    uid: string;
    type: ProblemStatus;
    problems: Problem[];
}

const badgeColors : Record<ProblemStatus, string> = {
    [ProblemStatus.JustSolved]: 'bg-purple-400',
    [ProblemStatus.StillHard]: 'bg-red-400',
    [ProblemStatus.NeedsToReview]: 'bg-orange-400',
    [ProblemStatus.JustReviewd]: 'bg-blue-400',
    [ProblemStatus.EasyNow]: 'bg-green-400'
}

const ProblemColumn = async ({ uid, type, problems } : PropsTypes) => {

  return (
    <div>
        <div className={`badge ${badgeColors[type]} mr-2`}>{type}</div>
        <label>{problems.length}</label>

        <div className="flex flex-col gap-2 mt-2">
            {problems.map((p, index) => (
                <Link href={`/problem/${uid}/${p.id}`} key={index} className='btn bg-white'>
                    {p.title}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default ProblemColumn