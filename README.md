# Studio Bookings Dashboard

A lightweight, dark-mode administrative dashboard designed for tracking and managing booking requests at **Konnect Studios**. Built with React, TypeScript, and Tailwind CSS.

## 🏗️ Project Architecture & Structure

```text
src/
├── assets/
│   └── data/
│       └── data.ts          # Mock initial booking records
├── components/
│   ├── DashboardHeader.tsx   # Top application bar & primary CTA trigger
│   ├── DashboardFilters.tsx  # Pure control inputs for tracking filters
│   ├── DashboardTable.tsx    # Rows display rendering panel
│   ├── BookingModal.tsx      # Validation form for creating bookings
│   └── StatusBadge.tsx       # Domain specific pill components
├── types/
│   └── types.ts             # Strict type declarations (Booking, BookingStatus)
├── App.tsx                  # Core engine, state coordination & processing
└── main.tsx                 # Application entry mount point

```


## ⚖️ Trade-offs & Decisions Under Time Constraints

Given the time constraints, several deliberate trade-offs were made to prioritize core features and deliver a functional UI:

### 1. Client-Side Data Execution vs. Server Synchronization

* **Trade-off:** Unable to integrate calenderly as mentioned in the task as additional.
* **Reasoning:** Unfamiliarity with calanderly and need for researching about it made me delebrately take the desition to exclude this feature.

### 2. Add dark light them toggle.

* **Trade-off:** Unable to add dsrk light theme toggle. 
* **Reasoning:** UI was unimportant for this task, even though I invested some amount of time for styling and due to time constraints I was not able to include the toggle feature.


---

## 🚀 Getting Started

1. Install required development node dependencies:
```bash
pnpm install

```


2. Start the local Vite development instance compiler:
```bash
pnpm run dev

```
