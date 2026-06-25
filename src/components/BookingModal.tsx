import { useState } from "react";
import type { Booking, BookingStatus } from "@/types/types";
import { X } from "lucide-react";
import { toast } from "react-toastify";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking: (booking: Omit<Booking, "id">) => void;
}

function BookingModal({ isOpen, onClose, onAddBooking }: BookingModalProps) {
  const [clientName, setClientName] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<BookingStatus>("pending");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (clientName.trim().length < 4) {
      toast.error("Client name must be at least 4 characters long.");
      return;
    }
    if (!sessionType.trim()) {
      toast.error("Session type is required.");
      return;
    }

    if (!date) {
      toast.error("Please select a valid booking date.");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate < today) {
      toast.error("Booking date cannot be in the past.");
      return;
    }
    onAddBooking({
      clientName: clientName.trim(),
      sessionType: sessionType.trim(),
      date,
      status,
    });
    setClientName("");
    setSessionType("");
    setDate("");
    setStatus("pending");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex justify-between items-center p-5 border-b border-neutral-800">
          <h2 className="text-xl font-bold text-neutral-100">Create New Booking</h2>
          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-neutral-200 p-1 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Client Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Session Type
            </label>
            <input
              type="text"
              placeholder="e.g. Audio Mixing, Recording"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Booking Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 cursor-pointer color-scheme-dark"
              style={{ colorScheme: "dark" }} 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Initial Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              className="w-full bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 cursor-pointer"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              Save Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default BookingModal;