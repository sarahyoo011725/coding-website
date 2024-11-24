import { genAi } from "@/app/gemini";
import { Problem } from "@/app/types";
import { SiLeetcode } from "react-icons/si";

type SimilarProblem = {
  title: string;
  link: string;
  topics: string[];
  source: string;
}

type Analysis = {
  suggestion: string;
  solution?: string;
}

const AiAnalysis = async ({ problem } : { problem : Problem }) => {
  const model = genAi.getGenerativeModel({model: "gemini-1.5-flash", generationConfig: {
    responseMimeType: "application/json"
  }});
  
  const analyze_code_prompt = `
    given by the description, generate a concise suggestion of better efficiency and algorithms with improved solution.
    -description: ${problem.description},
    -user_solution: ${problem.user_solution}
  
    return the result using this JSON format:
    response = {'suggestion': string, 'solution': string}
    Return: response;
  
    *you don't need to provide solution if user's solution is already optimized, but always generate analysis.
  `;
  const get_similar_problems_prompt = `
      list coding questions related or similar to this problems from Leetcode.
      specify the source by the platform's name.
      The problem is:
      -description: ${problem.description}
  
      response using this JSON format:
      problem = {'title': string, 'link': string, 'topics': string[], 'source': string}
      Return: Array<problem>;
  
      *if no similar problem found, return null.
      *do not return the same problem as the given problem.
  `
  const result1 = await model.generateContent(analyze_code_prompt);
  const analysis = JSON.parse(result1.response.text()) as Analysis;

  const result = await model.generateContent(get_similar_problems_prompt);
  const similarProblems = JSON.parse(result.response.text()) as SimilarProblem[];

  return (
    <div className="p-6 bg-slate-100 rounded-lg shadow-md">
      <section className="mb-6">
          <h2 className="font-bold text-xl mb-2">AI Analysis</h2>
          <div className="bg-white rounded-xl p-4 shadow-inner overflow-auto">
            <p className="whitespace-pre-wrap mb-4">{analysis.suggestion}</p>
            {analysis.solution && (
              <>
                <h3 className="font-bold mt-2">Improved Solution</h3>
                <code className="block bg-gray-100 rounded-lg p-2 overflow-auto">{analysis.solution}</code>
              </>
            )}
          </div>
      </section>

      <section>
        <h2 className="font-bold mb-2">Similar Problems</h2>
          <ul className="overflow-y-auto flex flex-col gap-2 max-h-[300px]">
            {similarProblems.map((problem, index) => (
               <ProblemLink key={index} title={problem.title} link={problem.link} />
            ))}
        </ul>
      </section>
    </div>
  )
}

export default AiAnalysis

const ProblemLink = ({ title, link} : { title: string, link: string}) => {
  return (
    <li className="bg-base-100 rounded-md p-4 font-medium hover:bg-base-300 cursor-pointer transition-colors duration-200">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className="flex justify-between items-center"
      >
        {title}
        <SiLeetcode size={24} />
      </a>
  </li>
  )
}