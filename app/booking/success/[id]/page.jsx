"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegCalendarCheck } from "react-icons/fa";
import Link from 'next/link';

// Add this CSS for printing
const PrintStyles = `
  @media print {
    body * { visibility: hidden; }
    #printable-slip, #printable-slip * { visibility: visible; }
    #printable-slip { position: absolute; left: 0; top: 0; width: 100%; }
    .no-print { display: none; }
  }
`;

export default function BookingSuccessPage({ params }) {
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            if (!params.id) return;
            const res = await fetch(`/api/track/${params.id}`); // Use the existing track API
            if (res.ok) {
                const data = await res.json();
                setBooking(data.data);
            }
        };
        fetchBooking();
    }, [params.id]);

    const handlePrint = () => {
        window.print();
    };

    if (!booking) return <div className="flex justify-center items-center h-screen">Generating Your Booking Slip...</div>;

    return (
        <>
            <style>{PrintStyles}</style>
            <div className="container mx-auto max-w-2xl p-4 my-10">
                <div className="text-center mb-8 no-print">
                    <h1 className="text-3xl font-bold text-green-600">Booking Request Received!</h1>
                    <p className="text-gray-600">An administrator will contact you shortly to confirm your event.</p>
                </div>

                <div id="printable-slip" className="p-8 border-2 border-dashed border-gray-400 rounded-lg bg-white">
                    <div className="header flex justify-between items-center border-b-2 pb-4 mb-6">
                        <div className="flex items-center gap-2">
                            <FaRegCalendarCheck className="text-fuchsia-500" size={30} />
                            <span className="text-black font-semibold text-2xl tracking-tight">Eventify</span>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-sm">Tracking ID: {booking._id}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Booked By</h3>
                            <p>{booking.userName}</p>
                            <p>{booking.userEmail}</p>
                            <p>{booking.userPhone}</p>
                        </div>
                        <div className="md:text-right">
                             <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking Details</h3>
                             <p>Status: 
                                <span className="font-bold ml-2 px-3 py-1 rounded-full text-white bg-yellow-500">
                                    {booking.bookingStatus}
                                </span>
                            </p>
                            <p>Requested on: {new Date(booking.createdAt).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="event-details bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Requested Service</h3>
                         <div className="flex items-start">
                            <Image src={booking.event.imageUrl} alt={booking.event.name} width={150} height={150} className="rounded-lg object-cover"/>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold">{booking.event.name}</h4>
                                <p className="text-gray-600 font-medium">Event Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                <p className="text-xl font-bold mt-2">Starts from: ₹{booking.event.price}</p>
                            </div>
                         </div>
                    </div>

                    <div className="footer text-center text-gray-500 text-xs mt-8">
                        You can track the status of this booking using your Tracking ID on our website.
                    </div>
                </div>
                <div className="text-center mt-8 no-print space-x-4">
                    <button onClick={handlePrint} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
                        Print Slip
                    </button>
                    <Link href="/track">
                        <button className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800">
                            Track Another Booking
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}