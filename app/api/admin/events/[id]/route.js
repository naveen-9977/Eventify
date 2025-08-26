import { NextResponse } from "next/server";
import ConnectToDB from "@/DB/ConnectToDB";
import Event from "@/schema/Event";
import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";

export async function GET(request, { params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }

  try {
    jsonwebtoken.verify(token.value, process.env.JWT_SECRET);
    await ConnectToDB();
    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ data: event });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}