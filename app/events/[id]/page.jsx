"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function EventDetailPage({ params }) {
    const [event, setEvent] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const router = useRouter();

    const getTodayDate = () => new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchEvent = async () => {
            const res = await fetch(`/api/events/${params.id}`);
            if (res.ok) setEvent((await res.json()).data);
        };
        if (params.id) fetchEvent();
    }, [params.id]);

    const handleProceedToPayment = () => {
        if (!userName || !userEmail || !userPhone || !bookingDate) {
            alert('Please fill in all the required fields.');
            return;
        }

        const queryParams = new URLSearchParams({
            eventId: event._id,
            eventName: event.name,
            eventPrice: event.price,
            eventImage: event.imageUrl,
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            bookingDate: bookingDate
        }).toString();
        
        router.push(`/payment?${queryParams}`);
    };

    if (!event) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Image src={event.imageUrl} alt={event.name} width={600} height={400} className="rounded-lg"/>
                </div>
                <div>
                    <h1 className="text-4xl font-bold">{event.name}</h1>
                    <p className="text-lg text-gray-600 my-4">{event.description}</p>
                    <p className="text-2xl font-bold">Starting from: ₹{event.price}</p>
                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-2xl font-bold mb-4">Request a Booking</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Your Full Name" value={userName} onChange={e => setUserName(e.target.value)} className="w-full p-3 border rounded-lg" required/>
                            <input type="email" placeholder="Your Email Address" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full p-3 border rounded-lg" required/>
                            <input type="tel" placeholder="Your Phone Number" value={userPhone} onChange={e => setUserPhone(e.target.value)} className="w-full p-3 border rounded-lg" required/>
                            <div>
                                <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">Select an Event Date</label>
                                <input type="date" id="bookingDate" value={bookingDate} onChange={e => setBookingDate(e.target.value)} min={getTodayDate()} className="w-full p-3 border rounded-lg" required />
                            </div>
                        </div>
                        <button onClick={handleProceedToPayment} className="w-full mt-6 bg-fuchsia-500 text-white p-3 rounded-lg font-bold hover:bg-fuchsia-600">Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
}