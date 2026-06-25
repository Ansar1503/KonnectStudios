import type { BookingStatus } from "@/types/types";

interface DashboardFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: BookingStatus | "all";
  setStatusFilter: (val: BookingStatus | "all") => void;
  sortBy: "date" | "name";
  setSortBy: (val: "date" | "name") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (val: "asc" | "desc") => void;
}

function DashboardFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: DashboardFiltersProps) {
  return (
    <div className="mx-8 mt-6 p-4 bg-neutral-900 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
      <div className="w-full md:w-1/3 relative">
        <input
          type="text"
          placeholder="Search reviews, users, or reasons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "name")}
          className="bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer"
        >
          <option value="name">Sort By: Name</option>
          <option value="date">Sort By: Date</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "all")}
          className="bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}

export default DashboardFilters;