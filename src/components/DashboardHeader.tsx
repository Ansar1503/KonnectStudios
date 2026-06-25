
function DashboardHeader() {
  return (
    <div className="flex justify-between items-center p-10 bg-gray-100 shadow-lg">
        <div className="">
            <h1 className="text-4xl font-bold">Konnect Studios</h1>
            <p className="text-lg">Manage and track studio bookings</p>
        </div>
        <button className="bg-black text-white px-6 py-2 font-semibold cursor-pointer rounded-md hover:bg-gray-500">+ New Booking</button>
    </div>

  )
}

export default DashboardHeader