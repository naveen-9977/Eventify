import ConnectToDB from "@/DB/ConnectToDB";
import Booking from "@/schema/Booking";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { event, userName, userEmail, userPhone, bookingDate, paymentMethod, transactionId } = await req.json();

  if (!event || !userName || !userEmail || !userPhone || !bookingDate || !paymentMethod || !transactionId) {
    return NextResponse.json({ message: "Missing required booking information." }, { status: 400 });
  }

  try {
    await ConnectToDB();
    
    const newBooking = await Booking.create({
      event,
      userName,
      userEmail,
      userPhone,
      bookingDate,
      paymentMethod,
      transactionId,
      bookingStatus: "Pending", // Always starts as Pending
    });

    return NextResponse.json({
      message: "Booking request successful!",
      booking: newBooking,
    }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: "Something went wrong during booking." }, { status: 500 });
  }
}