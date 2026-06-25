import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFilters from "@/components/DashboardFilters";
import DashboardTable from "@/components/DashboardTable";
import { ClinetData } from "@/assets/data/data";
import type { Booking, BookingStatus } from "@/types/types";
import BookingModal from "./components/BookingModal";
import { toast } from "react-toastify";

function App() {
  const [bookings, setBookings] = useState<Booking[]>(ClinetData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "name">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSortedBookings = bookings
    .filter((booking) => {
      const matchesSearch =
        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.sessionType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.clientName.localeCompare(b.clientName);
      } else if (sortBy === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    const handleAddBooking = (newBookingData: Omit<Booking, "id">) => {
    const newBookingItem: Booking = {
      id: bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
      ...newBookingData,
    };

    setBookings((prev) => [newBookingItem, ...prev]);
    toast.success("Booking added successfully!");
  };

  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
<DashboardHeader onOpenModal={() => setIsModalOpen(true)} />
      <DashboardFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <DashboardTable 
        bookings={filteredAndSortedBookings} 
        setBookings={setBookings} 
      />
    <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBooking={handleAddBooking}
      />
    </div>
    
  );
}

export default App;