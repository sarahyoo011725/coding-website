import { TopicsChart, Weakness } from "@/components"
import TodoList from "@/components/TodoList"

const HomePage = () => {
 
  return (
    <section className="flex flex-col lg:flex-row p-6 gap-6 min-h-screen">
      <main className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">Study Progress Overview</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-700">Topics Chart</h2>
            <TopicsChart />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-700">Todo List</h2>
            <TodoList />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium text-gray-700">Weakness Analysis</h2>
          <Weakness />
        </div>
      </main>
    </section>
  )
}

export default HomePage