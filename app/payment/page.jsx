"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useMemo } from 'react';
import Image from 'next/image';

function PaymentContent() {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false); // State for loading
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get data from URL
    const eventId = searchParams.get('eventId');
    const eventName = searchParams.get('eventName');
    const eventPrice = searchParams.get('eventPrice');
    const eventImage = searchParams.get('eventImage');
    const userName = searchParams.get('userName');
    const userEmail = searchParams.get('userEmail');
    const userPhone = searchParams.get('userPhone');
    const bookingDate = searchParams.get('bookingDate');

    // Generate a unique transaction ID and QR code URL
    const { transactionId, qrCodeUrl } = useMemo(() => {
        const txnId = `TXN${Date.now()}`;
        // --- YOUR UPI ID IS NOW USED HERE ---
        const upiLink = `upi://pay?pa=naveenbhatpahari@ybl&pn=Eventify&am=${eventPrice}&tid=${txnId}&tn=Booking for ${eventName}`;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
        return { transactionId: txnId, qrCodeUrl: qrApiUrl };
    }, [eventName, eventPrice]);


    const handleFinalizeBooking = async (selectedMethod) => {
        setIsProcessing(true); // Show loading state

        // Simulate a delay as if we are checking the payment network
        await new Promise(resolve => setTimeout(resolve, 2000));

        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: eventId,
                userName, userEmail, userPhone, bookingDate,
                paymentMethod: selectedMethod.toUpperCase(),
                transactionId
            })
        });

        if (res.ok) {
            const result = await res.json();
            router.push(`/booking/success/${result.booking._id}`);
        } else {
            alert('Booking failed. Please try again.');
            setIsProcessing(false); // Reset loading state on failure
        }
    };

    if (!eventId) return <div className="text-center p-10">Loading payment details...</div>;

    return (
        <div className="container mx-auto grid md:grid-cols-2 gap-12 my-10 px-4">
            {/* Order Summary */}
            <div className="order-summary">
                <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
                <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4 border-b pb-4">
                        <Image src={eventImage} alt={eventName} width={80} height={80} className="rounded-lg object-cover"/>
                        <div>
                            <h2 className="font-semibold">{eventName}</h2>
                            <p className="text-sm text-gray-600">For: {userName}</p>
                            <p className="text-sm text-gray-600">Date: {new Date(bookingDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold pt-4">
                        <span>Total:</span>
                        <span>₹{eventPrice}</span>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div className="payment-details">
                <h1 className="text-2xl font-bold mb-4">Choose Payment Method</h1>
                <div className="flex border-b mb-4">
                    <button onClick={() => setPaymentMethod('card')} className={`px-4 py-2 ${paymentMethod === 'card' ? 'border-b-2 border-fuchsia-500 font-semibold' : ''}`}>Credit/Debit Card</button>
                    <button onClick={() => setPaymentMethod('upi')} className={`px-4 py-2 ${paymentMethod === 'upi' ? 'border-b-2 border-fuchsia-500 font-semibold' : ''}`}>UPI</button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                    <div className="space-y-4">
                        <input type="text" placeholder="Card Number (e.g., 1234 5678 9012 3456)" className="w-full p-3 border rounded-lg" />
                        <input type="text" placeholder="Card Holder Name" className="w-full p-3 border rounded-lg" />
                        <div className="flex gap-4">
                            <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg" />
                            <input type="text" placeholder="CVV" className="w-1/2 p-3 border rounded-lg" />
                        </div>
                        <button onClick={() => handleFinalizeBooking('Card')} disabled={isProcessing} className="w-full mt-4 bg-green-500 text-white p-3 rounded-lg font-bold text-lg hover:bg-green-600 disabled:bg-gray-400">
                             {isProcessing ? 'Processing...' : `Pay ₹${eventPrice}`}
                        </button>
                    </div>
                )}

                {/* UPI Payment Display */}
                {paymentMethod === 'upi' && (
                    <div className="text-center">
                        <p>Scan the QR code with your UPI app</p>
                        <div className="flex justify-center my-4">
                           <Image src={qrCodeUrl} alt="Dynamic QR Code" width={200} height={200} />
                        </div>
                        <p className="text-sm text-gray-600">or pay to <span className="font-semibold">naveenbhatpahari@ybl</span></p>
                        
                        {/* This button simulates the automatic confirmation */}
                        <button onClick={() => handleFinalizeBooking('UPI')} disabled={isProcessing} className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400">
                            {isProcessing ? 'Waiting for Confirmation...' : 'I Have Paid, Confirm Now'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return ( <Suspense fallback={<div>Loading...</div>}> <PaymentContent /> </Suspense> );
}