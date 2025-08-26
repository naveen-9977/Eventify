// Keep the GET function as is
// ...
import Booking from "@/schema/Booking";
import ConnectToDB from "@/DB/ConnectToDB";
import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import Event from "@/schema/Event"; 

export async function GET(req, res) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (token) {
        try {
            let isVailed = jsonwebtoken.verify(token.value, process.env.JWT_SECRET);
            if(isVailed) {
                try {
                    ConnectToDB();
                    const bookings = await Booking.find({}).populate('event');
                    return NextResponse.json({ data: bookings });
                } catch (error) {
                    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
                }
            }
        } catch (error) {
             return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
        }
    } else {
        return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
}


// Updated PUT function
export async function PUT(req) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token) return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

    try {
        jsonwebtoken.verify(token.value, process.env.JWT_SECRET);
        // Now expecting 'id' and 'status'
        const { id, status } = await req.json();

        if (!status || !['Confirmed', 'Rejected'].includes(status)) {
            return NextResponse.json({ message: "Invalid status provided." }, { status: 400 });
        }
        
        await ConnectToDB();
        await Booking.findByIdAndUpdate(id, { bookingStatus: status });
        
        return NextResponse.json({ message: `Booking status updated to ${status}` }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to update booking status" }, { status: 500 });
    }
}