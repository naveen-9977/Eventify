import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken"

export async function POST(req, res) {

    const { token } = await req.json() // takes the token 

    // checks if token is vailed or not
    try {

        let isVailed = jsonwebtoken.verify(token, process.env.JWT_SECRET)

        if (isVailed) {

            return NextResponse.json({ messege: "token is vailed" }, {status: 200})
        }

    } catch (error) {

        return NextResponse.json({ messege: "token is not vailed" }, {status: 401})
    }

}
