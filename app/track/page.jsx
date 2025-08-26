"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaRegCalendarCheck } from "react-icons/fa";

// ... (Keep PrintStyles and ConfirmedBookingSlip components as they were, but update ConfirmedBookingSlip)

function ConfirmedBookingSlip({ booking }) {
    const handlePrint = () => window.print();
    return (
        <>
            <style>{/* PrintStyles CSS */}</style>
            <div className="mt-8 text-left">
                <div id="printable-slip" className="p-8 border-2 border-dashed border-green-500 rounded-lg bg-white">
                    <div className="header flex justify-between items-center border-b-2 pb-4 mb-6">
                        <div className="flex items-center gap-2">
                            <FaRegCalendarCheck className="text-fuchsia-500" size={30} />
                            <span className="text-black font-semibold text-2xl tracking-tight">Eventify</span>
                        </div>
                        <div className="text-right">
                             <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
                            <p className="text-gray-500 text-sm">Tracking ID: {booking._id}</p>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Booked By</h3>
                            <p>{booking.userName}</p>
                            <p><strong>Transaction ID:</strong> {booking.transactionId}</p>
                            <p><strong>Paid via:</strong> {booking.paymentMethod}</p>
                        </div>
                        <div className="md:text-right">
                             <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking Details</h3>
                             <p>Status: <span className="font-bold text-green-600">{booking.bookingStatus}</span></p>
                            <p>Confirmed on: {new Date(booking.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="event-details bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Confirmed Service</h3>
                        <Image src={booking.event.imageUrl} alt={booking.event.name} width={100} height={100} className="rounded-lg object-cover mb-2"/>
                        <h4 className="text-lg font-semibold">{booking.event.name}</h4>
                        <p className="font-medium">Event Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="text-center mt-8 no-print">
                    <button onClick={handlePrint} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">Print Slip</button>
                </div>
            </div>
        </>
    );
}

// Main Tracking Page Component
export default function TrackBookingPage() {
    const [trackingId, setTrackingId] = useState('');
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTrackBooking = async () => {
        if (!trackingId) { setError('Please enter a tracking ID.'); return; }
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
    
    const renderStatusDetails = () => {
        if (!booking) return null;

        switch (booking.bookingStatus) {
            case 'Confirmed':
                return <ConfirmedBookingSlip booking={booking} />;
            case 'Rejected':
                return (
                    <div className="mt-8 text-left border border-red-300 bg-red-50 rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Booking Rejected</h2>
                        <p><strong>Service:</strong> {booking.event.name}</p>
                        <p><strong>Event Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                        <p className="mt-4 text-gray-700">Unfortunately, we were unable to confirm your booking for the selected date. Your payment of <strong>₹{booking.event.price}</strong> made via {booking.paymentMethod} (Transaction ID: {booking.transactionId}) will be refunded to your account within 5-7 business days.</p>
                    </div>
                );
            case 'Pending':
                return (
                     <div className="mt-8 text-left border rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Booking Status</h2>
                        <p><strong>Service:</strong> {booking.event.name}</p>
                        <p><strong>Status:</strong> <span className="font-bold text-yellow-600">{booking.bookingStatus}</span></p>
                        <p className="text-gray-600 pt-2">An administrator will contact you soon to confirm your booking.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto max-w-2xl text-center py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Track Your Booking</h1>
            <div className="flex justify-center gap-2">
                <input type="text" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="Enter your tracking ID" className="p-3 border rounded-lg w-full md:w-1/2"/>
                <button onClick={handleTrackBooking} disabled={loading} className="bg-fuchsia-500 text-white font-bold p-3 rounded-lg">
                    {loading ? 'Searching...' : 'Track'}
                </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {renderStatusDetails()}
        </div>
    );
}