import { StatusBadge } from "@/components/StatusBadge"
import type { Booking } from "@/types/types";
import { Trash2 } from "lucide-react"
import { useState } from "react";
import { toast } from "react-toastify";

interface DashboardTableProps {
    bookings: Booking[];
}

function DashboardTable({bookings}: DashboardTableProps) {
    const [bookingList,setBookingList] = useState<Booking[]>(bookings)
    const handleDelete = (id:number)=>{
        if(!id){
            toast.error('invalid user! Id not found')
        }else{
            const newBookingList = bookingList.filter((booking)=>booking.id !== id)
            setBookingList(newBookingList)
            toast.success('booking deleted successfully')
        }
    }
    return (
        <div className="mt-10 mx-8">
            <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-300 rounded-xl">
                    <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Client Name</th>
                        <th className="p-3">Session Type</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                        <th className="text-right pr-4">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-neutral-200 text-left">
                   {bookingList.map((booking) => (
                    <tr key={booking.id}>
                        <td className="p-2">{booking.id}</td>
                        <td className="p-2">{booking.clientName}</td>
                        <td className="p-2">{booking.sessionType}</td>
                        <td className="p-2">{booking.date}</td>
                        <td className="p-2"><StatusBadge status={booking.status} /></td>
                        <td className="text-right pr-4"><button onClick={()=>{handleDelete(booking.id)}} className="p-2 cursor-pointer text-red-600 hover:text-red-400 ">
                                <Trash2 size={18} />
                            </button></td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable