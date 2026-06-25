export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: number;
  clientName: string;
  sessionType: string;
  date: string;
  status: BookingStatus;
}
