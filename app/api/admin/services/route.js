import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import ConnectToDB from "@/DB/ConnectToDB";
import Services from "@/schema/Services";

export async function POST(req, res) {
  const { AllServices } = await req.json();
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    // checks if token is vailed or not
    try {
      let isVailed = jsonwebtoken.verify(token.value, process.env.JWT_SECRET);

      if (isVailed) {
        try {
          ConnectToDB();

          AllServices.map(async (item) => {
            await Services.findByIdAndUpdate(item._id, {
              mainTitle: item.mainTitle,
              para1: item.para1,
              para2: item.para2,
              secondaryTitle: item.secondaryTitle,
              para3: item.para3,
              para4: item.para4,
              thirdTitle: item.thirdTitle,
              para5: item.para5,
              para6: item.para6,
              fourthTitle: item.fourthTitle,
              para7: item.para7,
              para8: item.para8,
            });
          });

          return NextResponse.json({ message: "Update Sucessfull" });
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
          );
        }
        // return NextResponse.json({ messege: "token is vailed" }, {status: 200})
      }
    } catch (error) {
      // return NextResponse.json({ messege: "token is not vailed" }, {status: 401})
      return NextResponse.json({ message: "Not Authorized" }, { status: 302 });
    }
  } else {
    return NextResponse.json({ message: "Not Authorized" }, { status: 302 });
  }
}
