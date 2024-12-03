import { TopicsChart, Weakness } from "@/components"
import TodoList from "@/components/TodoList"

const HomePage = () => {
 
  return (
    <>  
      <section className="flex flex-col lg:flex-row justify-center items-center p-4 gap-6 h-full">
        <div className="flex flex-col w-full gap-6">
          <div className="flex w-full gap-4 justify-center">
            <div className="w-full lg:w-1/2">
              <TopicsChart />
            </div>
            <div className="w-full lg:w-1/2">
              <TodoList />
            </div>
          </div>
          <Weakness />  
        </div>
      </section>
    </>
  )
}

export default HomePage