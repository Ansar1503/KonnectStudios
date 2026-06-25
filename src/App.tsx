import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFilters from "@/components/DashboardFilters";
import DashboardTable from "@/components/DashboardTable";
import { ClinetData } from "@/assets/data/data";
import type { Booking, BookingStatus } from "@/types/types";
import BookingModal from "./components/BookingModal";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";

function App() {
  const [bookings, setBookings] = useState<Booking[]>(ClinetData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "name">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

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
  const totalItems = filteredAndSortedBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = filteredAndSortedBookings.slice(startIndex, endIndex);

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
        bookings={paginatedBookings}
        setBookings={setBookings}
      />
      {totalItems > 0 && (
        <div className="mx-8 mt-4 flex items-center justify-between text-sm text-neutral-400">
          <div>
            Showing <span className="font-semibold text-neutral-200">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-neutral-200">
              {Math.min(endIndex, totalItems)}
            </span>{" "}
            of <span className="font-semibold text-neutral-200">{totalItems}</span> bookings
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-neutral-900 cursor-pointer disabled:cursor-not-allowed text-neutral-200"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-neutral-300 px-2">
              Page <span className="text-neutral-100 font-medium">{currentPage}</span> of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-neutral-900 cursor-pointer disabled:cursor-not-allowed text-neutral-200 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBooking={handleAddBooking}
      />
    </div>

  );
}

export default App;