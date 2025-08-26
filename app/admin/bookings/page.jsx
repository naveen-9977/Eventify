"use client";
import { useState, useEffect } from "react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [render, setRender] = useState(false); 

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) setBookings((await res.json()).data);
    };
    fetchBookings();
  }, [render]);

  const handleStatusUpdate = async (id, status) => {
    const confirmationText = status === 'Confirmed' 
        ? "Are you sure you want to confirm this booking?" 
        : "Are you sure you want to reject this booking?";
    if (!confirm(confirmationText)) return;

    const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
    });

    if (res.ok) {
        alert(`Booking ${status.toLowerCase()}!`);
        setRender(!render);
    } else {
        alert("Failed to update status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
        case 'Confirmed': return 'bg-green-50 border-green-300';
        case 'Pending': return 'bg-yellow-50 border-yellow-300';
        case 'Rejected': return 'bg-red-50 border-red-300';
        default: return 'bg-gray-50 border-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">All Bookings</h1>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className={`border p-4 rounded-lg ${getStatusColor(booking.bookingStatus)}`}>
              <h2 className="font-bold text-lg">{booking.event?.name || 'Event not found'}</h2>
              <div className="my-2 border-t pt-2 space-y-1 text-sm">
                <p><strong>Client:</strong> {booking.userName}</p>
                <p><strong>Phone:</strong> {booking.userPhone}</p>
                <p><strong>Event Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Payment:</strong> {booking.paymentMethod} ({booking.transactionId})</p>
                <p><strong>Status:</strong> {booking.bookingStatus}</p>
              </div>
              {booking.bookingStatus === 'Pending' && (
                <div className="flex gap-2 mt-2">
                    <button onClick={() => handleStatusUpdate(booking._id, 'Confirmed')} className="w-full bg-green-600 text-white font-bold py-1 rounded-lg text-sm">Approve</button>
                    <button onClick={() => handleStatusUpdate(booking._id, 'Rejected')} className="w-full bg-red-600 text-white font-bold py-1 rounded-lg text-sm">Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : <p className="text-center text-gray-500">No bookings found.</p>}
    </div>
  );
}