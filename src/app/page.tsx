import logo from "public/images/Logo.png"
import Image from "next/image";
import Subtitle from "./_components/subtitle";

export default async function Home() {


  return (
    <div className="">
      <div className="flex flex-row gap-8 items-center">
        <div>
          <h1 className="text-5xl font-extrabold text-accent sm:text-[4rem]">
            SWE Training
          </h1>
          <p className="pt-2 font-code text-primary-foreground">
            By RoBorregos
          </p>
        </div>

        <Image src={logo} alt="Logo" className="h-40 w-fit" />
      </div>

      <div className="pt-16 text-primary-foreground font-main">
        <Subtitle label="What is SWE Training?" />

        <p className="pt-2">
          A program for students interested in software engineering internships.
          <br />
          The plan involves a lot of self learning and covers the following:
        </p>
        <ul className="list-disc pl-6 pb-10">
          <li>Interview preparation</li>
          <li>Interview Mockups</li>
          <li>Resume workshop</li>
        </ul>

        <Subtitle label="How does it work?" />
        <p className="pt-2 pb-10">
          For about 5 weeks, we&apos;ll be practicing coding problems following a weekly topic. Problem solutions will be presented each saturday.
          <br />
          There will be a person selected to present each recommended problem, with the purpose of practicing the explanation process and sharing their approaches (they will be notified a few days before).
          <br />
          Aproximately during sunday, the next set of weekly problems will be released.
          <br />
          After the 5 weeks, we will have a workshop to review resumes and provide tips and examples.
          <br />
          Finally, on the last week, we will have mock interviews to wrap up the program.
          <br />
          Even after the training, make sure to check the chat, as it is common for people to share when new positions open.
        </p>

        <Subtitle label="Suggestions" />
        <p className="pt-2 pb-10">
          The problems marked with a star are the ones that we recommend you to solve and the ones that will be presented every saturday.
          <br />
          Try each problem really hard and avoid checking hints, this will take away from the learning experience and though process.
          <br />
          Feel free to make questions in the chat but don&apos;t spoil solutions.
        </p>

        <Subtitle label="Connect with leetcode" />
        <p className="pt-2 pb-10">
          Make sure to login and update your leetcode handle to keep track of solved problems. They will automatically update as long as your leetcode handle (username) is correct.
          <br />
          Click on the user at the top right corner to access your profile.
        </p>

      </div>
    </div>
  );
}
