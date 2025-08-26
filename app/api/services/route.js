import ConnectToDB from "@/DB/ConnectToDB";
import Services from "@/schema/Services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    ConnectToDB();
    let allEntries = await Services.find({});

    // if all entries 0 then create 3 of them

    if (allEntries.length == 0) {
      await Services.create({
        mainTitle: "Event Services",
        para1:
          "Transform your vision into a reality with our comprehensive event services.  Whether you're planning a grand gala, a strategic conference, or an intimate gathering, our team of experienced professionals will handle every detail.  From venue selection and vendor coordination to creative design and seamless execution, we'll ensure your event is not only flawless but leaves a lasting impression on your guests.",
        para2:
          "We take the stress out of event planning. Let us handle the logistics, so you can focus on the celebration.",
        secondaryTitle: "Event Strategy & Consulting",
        para3:
          "Our experienced event consultants will work closely with you to understand your event goals, target audience, and budget. We'll guide you through the entire process, from defining your event objectives to developing a data-driven strategy for maximum impact.  This includes competitor analysis, audience research, and creating a clear timeline and budget roadmap.  Together, we'll ensure your event aligns seamlessly with your overall marketing and business objectives.",
        para4:
          "Don't navigate the complexities of event planning alone.  Our consultants provide expert advice and support, empowering you to make informed decisions every step of the way.",
        thirdTitle: "Creative Design & Décor",
        para5:
          "Bring your event vision to life with our talented team of designers and decorators.  We'll collaborate with you to understand your theme, style preferences, and budget, then craft a cohesive and visually stunning atmosphere.  From stage design and floral arrangements to lighting and furniture selection, we'll create an immersive experience that captivates your guests.",
        para6:
          "We handle every detail, ensuring your event décor is not only beautiful but also functional and complements the overall flow of the event.",
        fourthTitle: "Event Marketing & Promotion",
        para7:
          "In today's digital age, reaching the right audience for your event is crucial. Our event marketing and promotion experts will craft a targeted strategy to generate excitement and drive attendance. We'll leverage a variety of channels, including social media marketing, email campaigns, influencer outreach, and public relations, to ensure your event gets the buzz it deserves. From creating compelling content to managing online registration, we'll handle every aspect of promoting your event to maximize its reach and impact.",
        para8:
          "Don't let your event become a hidden gem. Let us amplify your message and get your target audience through the door.",
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
