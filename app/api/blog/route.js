import ConnectToDB from "@/DB/ConnectToDB";
import Blogs from "@/schema/Blogs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { id } = await req.json();

  console.log(typeof objid);

  try {
    ConnectToDB();

    let objid = new mongoose.Types.ObjectId(id);

    let allEntries = await Blogs.find({ _id: objid });

    if (allEntries.length >= 0) {
      return NextResponse.json({ data: allEntries });
    } else {
      return NextResponse.json({ status: 404 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
