"use client";
import { useState } from 'react';

export default function TrackBookingPage() {
    const [trackingId, setTrackingId] = useState('');
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTrackBooking = async () => {
        if (!trackingId) {
            setError('Please enter a tracking ID.');
            return;
        }
        setLoading(true);
        setError('');
        setBooking(null);

        const res = await fetch(`/api/track/${trackingId}`);
        const data = await res.json();
        
        setLoading(false);
        if (res.ok) {
            setBooking(data.data);
        } else {
            setError(data.message || 'Could not find booking.');
        }
    };

    return (
        <div className="container mx-auto max-w-2xl text-center py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Track Your Booking</h1>
            <p className="text-gray-600 mb-6">Enter the tracking ID you received after booking to see the status.</p>
            <div className="flex justify-center gap-2">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter your tracking ID"
                    className="p-3 border rounded-lg w-full md:w-1/2"
                />
                <button onClick={handleTrackBooking} disabled={loading} className="bg-fuchsia-500 text-white font-bold p-3 rounded-lg hover:bg-fuchsia-600 disabled:bg-gray-400">
                    {loading ? 'Searching...' : 'Track'}
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            
            {booking && (
                <div className="mt-8 text-left border rounded-lg p-6 shadow-lg animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4">Booking Status</h2>
                    <div className="space-y-2">
                        <p><strong>Service:</strong> {booking.event.name}</p>
                        <p><strong>Your Name:</strong> {booking.userName}</p>
                        <p><strong>Event Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                        <p>
                            <strong>Status:</strong> 
                            <span className={`ml-2 font-bold px-3 py-1 rounded-full text-white ${
                                booking.bookingStatus === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}>
                                {booking.bookingStatus}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Simple CSS for fade-in animation (add to your globals.css if you wish)
/*
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}
*/