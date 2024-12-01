import { TopicsChart } from "@/components"
import TodoList from "@/components/TodoList"

const HomePage = () => {
 
  return (
    <>  
      <section className="flex flex-col lg:flex-row justify-center items-center p-4 gap-6 h-full">
        <div className="w-full lg:w-1/2">
          <TopicsChart />
        </div>
        <div className="w-full lg:w-1/2">
          <TodoList />
        </div>
      </section>
    </>
  )
}

export default HomePage