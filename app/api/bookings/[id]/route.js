import { NextResponse } from "next/server";
import ConnectToDB from "@/DB/ConnectToDB";
import Booking from "@/schema/Booking";
import Event from "@/schema/Event"; // Important for populating event data

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await ConnectToDB();
    const booking = await Booking.findById(id).populate('event');
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json({ data: booking });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong fetching booking details." },
      { status: 500 }
    );
  }
}