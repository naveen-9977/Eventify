import ConnectToDB from "@/DB/ConnectToDB";
import Team from "@/schema/Team";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    ConnectToDB();
    let allEntries = await Team.find({});

    if (allEntries.length == 0) {
      await Team.create(
        { name: "Harpreet Singh", imageURL: "images/m1.png" },
        { name: "Shubham Kumar", imageURL: "images/m2.png" },
        { name: "Kunal Mehta", imageURL: "images/m3.png" },
        { name: "Rajeev Sharma", imageURL: "images/m4.png" },
        { name: "Sunil Yadav", imageURL: "images/m5.png" }
      );

      let allData = await Mentor.find({});

      return NextResponse.json({ data: allData });
    } else {
      return NextResponse.json({ data: allEntries });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
