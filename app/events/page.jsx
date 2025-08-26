"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function EventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch('/api/events');
            const data = await res.json();
            setEvents(data.data);
        };
        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto px-4">
            {/* Title Changed */}
            <h1 className="text-3xl font-bold text-center my-8">Events We Organize</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <Link href={`/events/${event._id}`} key={event._id} className="block group">
                        <div className="border rounded-lg overflow-hidden cursor-pointer h-full transition-shadow duration-300 group-hover:shadow-xl">
                            <Image src={event.imageUrl} alt={event.name} width={400} height={250} className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{event.name}</h2>
                                {/* Removed the fixed date display */}
                                <p className="font-semibold text-gray-800 mt-2">Starts from ₹{event.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}