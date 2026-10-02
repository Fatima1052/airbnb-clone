// The one place the app "talks to the backend" to book something.
//
// Set REACT_APP_API_URL (in .env.local, or as a Vercel env var) to point this
// at the Node/Express API in airbnb-clone-backend/. Until that's set, this
// keeps failing with the same clear message it always has — nothing changes
// for the live site until a backend is actually deployed and configured.
import { auth } from "../firebase";

const API_URL = process.env.REACT_APP_API_URL;

// `booking` looks like:
//   { kind, itemId, checkIn, checkOut, date, guests: { adults, children, infants, pets },
//     pricing: { nightlyPrice, nights, subtotal, serviceFee, total } }
//
// `pricing` is only for display while the request is in flight – the backend
// always recalculates the price itself from the listing's real price and
// ignores whatever is sent here.
export async function createBooking(booking) {
  if (!API_URL) {
    throw new Error("BOOKING_BACKEND_NOT_CONNECTED");
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("You need to be logged in to book.");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      kind: booking.kind,
      listingId: String(booking.itemId),
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      date: booking.date,
      guests: booking.guests,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

// The logged-in user's past and upcoming bookings, newest first.
export async function getMyBookings() {
  if (!API_URL) return [];

  const user = auth.currentUser;
  if (!user) return [];

  const token = await user.getIdToken();

  const response = await fetch(`${API_URL}/bookings/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Could not load your trips.");

  return response.json();
}
