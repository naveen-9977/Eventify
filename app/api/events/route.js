import ConnectToDB from "@/DB/ConnectToDB";
import Event from "@/schema/Event";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    ConnectToDB();
    let allEvents = await Event.find({});
    return NextResponse.json({ data: allEvents });
  } catch (err) {
    return NextResponse.json({ message: "something went wrong" });
  }
}