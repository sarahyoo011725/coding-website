import Navbar from "../../components/Navbar"

const layout = ({ children } : { children : React.ReactNode}) => {
  return (
    <div className="h-full">
        <Navbar />
        {children}
    </div>
  )
}

export default layout