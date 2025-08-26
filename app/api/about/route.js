import ConnectToDB from "@/DB/ConnectToDB";
import About from "@/schema/About";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    ConnectToDB();
    let allEntries = await About.find({});

    // if all entries 0 then create 3 of them

    if (allEntries.length == 0) {
      await About.create({
        mainTitle: "Your Trusted Partner for Event Management",
        para1:
          "We are a passionate team of event planners dedicated to exceeding your expectations and crafting experiences that leave a lasting impression. From intimate gatherings to large-scale productions, we handle every detail with meticulous care and unwavering commitment.",
        para2:
          "Our passion lies in transforming your vision into a seamless and captivating event.",
        secondaryTitle: "Simplifying Event Management",
        para3:
          "At Evwntify, we believe event planning should be an exciting, creative experience, not a source of stress. That's why we've developed a user-friendly app that streamlines the entire process, from initial brainstorming to post-event analysis.",
        para4:
          "Our goal is to empower event organizers of all experience levels to create unforgettable experiences, all while saving them valuable time and resources.",
      });

      let allData = await FAQs.find({});

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
