interface DashboardHeaderProps {
  onOpenModal: () => void;
}

function DashboardHeader({ onOpenModal }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center px-8 py-8 bg-neutral-950 border-b border-neutral-900">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100">Konnect Studios</h1>
            <p className="text-sm text-neutral-400 mt-1">Manage and track studio bookings</p>
        </div>
        <button 
          onClick={onOpenModal}
          className="bg-neutral-100 text-neutral-900 px-5 py-2 text-sm font-semibold cursor-pointer rounded-lg hover:bg-neutral-200 active:scale-95 transition-all shadow-sm"
        >
            + New Booking
        </button>
    </div>
  )
}

export default DashboardHeader;