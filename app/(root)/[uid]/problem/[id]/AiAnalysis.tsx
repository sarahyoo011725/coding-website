import { genAi } from "@/app/gemini";
import { Problem } from "@/app/types";
import { SiLeetcode } from "react-icons/si";
import SyntaxHighlighter from "react-syntax-highlighter";

type SimilarProblem = {
  title: string;
  link: string;
  topics: string[];
  source: string;
};

type Analysis = {
  suggestion: string;
  solution?: string;
};


const fetchAiAnalysis = async (problem: Problem): Promise<{ analysis: Analysis; similarProblems: SimilarProblem[] | null }> => {
  const model = genAi.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const analyzeCodePrompt = `
    Given the description, generate a concise suggestion of better efficiency and algorithms with an improved solution.
    The improved solution must be codes. Return null solution if there is no need of improving solution.
    - Description: ${problem.description},
    - User Solution: ${problem.user_solution}

    Return the result in this JSON format:
    response = {'suggestion': string, 'solution': string}
    Return: response;
  `;

  const getSimilarProblemsPrompt = `
    List coding questions related or similar to this problem from Leetcode.
    Specify the source by the platform's name.
    - Description: ${problem.description}

    Return the result in this JSON format:
    problem = {'title': string, 'link': string, 'topics': string[], 'source': string}
    Return: Array<problem>;

    * If no similar problems are found, return null.
    * Do not return the same problem as the given problem.
  `;

  const [analysisResult, similarProblemsResult] = await Promise.all([
    model.generateContent(analyzeCodePrompt),
    model.generateContent(getSimilarProblemsPrompt),
  ]);

  const analysis = JSON.parse(analysisResult.response.text());
  const similarProblems = JSON.parse(similarProblemsResult.response.text());

  return { analysis, similarProblems };
};

const AiAnalysis = async ({ problem }: { problem: Problem }) => {
  const {analysis, similarProblems} = await fetchAiAnalysis(problem);

  return (
    <div className="p-6 bg-slate-100 rounded-lg shadow-md">
      <section className="mb-6">
        <h2 className="font-bold text-xl mb-2">AI Analysis</h2>
        <div className="bg-white rounded-xl p-4 shadow-inner overflow-auto">
          <p className="whitespace-pre-wrap mb-4">{analysis.suggestion}</p>
          {analysis.solution && (
            <>
              <h3 className="font-bold mt-2">Improved Solution</h3>
              <code className="block bg-gray-100 rounded-lg p-2 overflow-auto">
                <SyntaxHighlighter>
                  {analysis.solution}
                </SyntaxHighlighter>
              </code>
            </>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-bold mb-2">Similar Problems</h2>
        {similarProblems && similarProblems.length > 0 ? (
          <ul className="overflow-y-auto flex flex-col gap-2 max-h-[300px]">
            {similarProblems.map((problem, index) => (
              <ProblemLink key={index} title={problem.title} link={problem.link} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No similar problems found.</p>
        )}
      </section>
    </div>
  );
};

const ProblemLink = ({ title, link }: { title: string; link: string }) => {
  return (
    <li className="bg-base-100 rounded-md p-4 font-medium hover:bg-base-300 cursor-pointer transition-colors duration-200">
      <a target="_blank" rel="noopener noreferrer" href={link} className="flex justify-between items-center">
        {title}
        <SiLeetcode size={24} />
      </a>
    </li>
  );
};

export default AiAnalysis;
