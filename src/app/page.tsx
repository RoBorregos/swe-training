import logo from "public/images/Logo.png"
import Image from "next/image";
import Subtitle from "./_components/subtitle";

export default async function Home() {


  return (
    <div className="">
      <div className="flex flex-row gap-8 items-center">
        <div>
          <h1 className="text-5xl font-extrabold sm:text-[4rem] text-accent">
            SWE Training
          </h1>
          <p className="text-primary-foreground font-code pt-2">
            By RoBorregos
          </p>
        </div>

        <Image src={logo} alt="Logo" className="h-40 w-fit" />
      </div>

      <div className="pt-16 text-primary-foreground font-main">
        <Subtitle label="What is SWE Training?" />

        <p className="pt-2">
          A program for students interested in software engineering internships.
        </p>
        <ul className="list-disc pl-6">
          <li>Interview preparation</li>
          <li>Interview Mockups</li>
          <li>Resume workshop</li>
        </ul>
      </div>

      <div className="pt-16 text-primary-foreground font-main">
        <Subtitle label="Recommended Topics" />
      </div>

    </div>
  );
}


