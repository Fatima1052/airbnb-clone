// The one place the app "talks to the backend" to book something.
//
// The backend does not exist yet, so this always fails with a clear message.
// In the backend phase, replace the body with a real request, e.g.
//
//   const response = await fetch(`${API_URL}/bookings`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(booking),
//   });
//
// `booking` looks like:
//   { kind, itemId, checkIn, checkOut, date, guests: { adults, children, infants, pets },
//     pricing: { nightlyPrice, nights, subtotal, serviceFee, total } }
export async function createBooking(booking) {
  void booking;
  throw new Error("BOOKING_BACKEND_NOT_CONNECTED");
}
