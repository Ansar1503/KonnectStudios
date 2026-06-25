import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFilters from "@/components/DashboardFilters";
import DashboardTable from "@/components/DashboardTable";
import { ClinetData } from "@/assets/data/data";
import type { Booking, BookingStatus } from "@/types/types";

function App() {
  const [bookings, setBookings] = useState<Booking[]>(ClinetData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "name">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
      <DashboardHeader />
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
    </div>
  );
}

export default App;