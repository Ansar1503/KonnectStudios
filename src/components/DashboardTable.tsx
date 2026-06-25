import { StatusBadge } from "@/components/StatusBadge";
import type { Booking } from "@/types/types";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface DashboardTableProps {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

function DashboardTable({ bookings, setBookings }: DashboardTableProps) {
  const handleDelete = (id: number) => {
    if (!id) {
      toast.error("Invalid user! Id not found");
    } else {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      toast.success("Booking deleted successfully");
    }
  };

  return (
    <div className="mt-6 mx-8 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-md">
      <table className="w-full text-left border-collapse">
        <thead className="bg-neutral-800 text-neutral-400 text-xs font-semibold uppercase tracking-wider border-b border-neutral-700">
          <tr>
            <th className="p-4 w-16">#</th>
            <th className="p-4">Client Name</th>
            <th className="p-4">Session Type</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right pr-6">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800 text-sm text-neutral-300">
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-8 text-center text-neutral-500">
                No matching bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-neutral-800/50 transition-colors">
              <td className="p-4 font-medium text-neutral-500">{booking.id}</td>
                <td className="p-4 font-semibold text-neutral-100">{booking.clientName}</td>
                <td className="p-4 text-neutral-400">{booking.sessionType}</td>
                <td className="p-4 text-neutral-400">{booking.date}</td>
                <td className="p-4">
                  <div className="inline-flex">
                    <StatusBadge status={booking.status} />
                  </div>
                </td>
                <td className="p-4 text-right pr-6">
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;