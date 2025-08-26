import { NextResponse } from "next/server";
import ConnectToDB from "@/DB/ConnectToDB";
import Booking from "@/schema/Booking";
import Event from "@/schema/Event";

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
    // Handle cases where the ID format is invalid
    if (err.kind === 'ObjectId') {
        return NextResponse.json({ message: "Invalid Tracking ID format" }, { status: 400 });
    }
    return NextResponse.json({ message: "Could not retrieve booking status." }, { status: 500 });
  }
}