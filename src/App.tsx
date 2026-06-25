import DashboardHeader from "@/components/DashboardHeader";
import DashboardTable from "@/components/DashboardTable";
import { ClinetData } from "@/assets/data/data"

function App() {

  return (
    <>
      <DashboardHeader />
      <DashboardTable bookings={ClinetData}/>
    </>
  )
}

export default App
