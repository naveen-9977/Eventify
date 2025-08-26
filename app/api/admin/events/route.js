import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import ConnectToDB from "@/DB/ConnectToDB";
import Event from "@/schema/Event";

// GET all events (for the admin list)
export async function GET(req, res) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token) return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

    try {
        jsonwebtoken.verify(token.value, process.env.JWT_SECRET);
        await ConnectToDB();
        const events = await Event.find({});
        return NextResponse.json({ data: events });
    } catch (err) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

// POST a new event
export async function POST(req, res) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

    try {
        jsonwebtoken.verify(token.value, process.env.JWT_SECRET);
        const { name, description, price, date, imageUrl } = await req.json();
        await ConnectToDB();
        await Event.create({ name, description, price, date, imageUrl });
        return NextResponse.json({ message: "Event created successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

// PUT (update) an event
export async function PUT(req, res) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

    try {
        jsonwebtoken.verify(token.value, process.env.JWT_SECRET);
        const { _id, name, description, price, date, imageUrl } = await req.json();
        await ConnectToDB();
        await Event.findByIdAndUpdate(_id, { name, description, price, date, imageUrl });
        return NextResponse.json({ message: "Event updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong during update" }, { status: 500 });
    }
}

// DELETE an event
export async function DELETE(req, res) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

    try {
        jsonwebtoken.verify(token.value, process.env.JWT_SECRET);
        const { id } = await req.json();
        await ConnectToDB();
        await Event.findByIdAndDelete(id);
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong during deletion" }, { status: 500 });
    }
}