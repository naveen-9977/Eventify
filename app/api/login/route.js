import ConnectToDB from "@/DB/ConnectToDB";
import User from "@/schema/Users";
import bcrypt from "bcrypt";
import jsonwebtoken from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";

export async function POST(req, res) {
  // Now expecting 'mobileNumber' instead of 'name'
  const { mobileNumber, password } = await req.json();

  let cookieStore = cookies()

  try {
    ConnectToDB();
    // Find user by 'mobileNumber'
    const user = await User.findOne({ mobileNumber: mobileNumber });

    if (user) {
      const isVailed = await bcrypt.compare(password, user.password)
      if (isVailed) {
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET)
        cookieStore.set('token', token, { expires: Date.now() + (24 * 60 * 60 * 1000) * 400 })
        return NextResponse.json({ messege: "success" }, { status: 200 })
      } else {
        return NextResponse.json({ messege: "Invailed credentials" }, { status: 401 })
      }

    } else {
      return NextResponse.json({ messege: "invailed credentials" }, { status: 401 });
    }

  } catch (err) {
    return NextResponse.json({ messege: "something went wrong" }, { status: 500 });
  }
}