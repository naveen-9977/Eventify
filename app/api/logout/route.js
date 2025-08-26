import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {
  let cookieStore = cookies();
  try {
    cookieStore.set("token", "", {
      expires: Date.now() + 24 * 60 * 60 * 1000 * 400,
    });
    return NextResponse.json(
      { messege: "loged out sucessfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { messege: "something went wrong" },
      { status: 500 }
    );
  }
}
