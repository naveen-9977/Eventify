import ConnectToDB from "@/DB/ConnectToDB";
import Blogs from "@/schema/Blogs";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        ConnectToDB()

        let allEntries = await Blogs.find({})
        return NextResponse.json({ data: allEntries })

     } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "something went wrong" })
    }

}
