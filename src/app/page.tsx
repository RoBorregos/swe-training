import logo from "public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import Subtitle from "./_components/subtitle";

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-2xl bg-primary-light p-6 shadow-lg">
    <Subtitle label={title} />
    <div className="pt-3 text-primary-foreground">{children}</div>
  </section>
);

export default async function Home() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center gap-8 rounded-2xl bg-primary-light p-8 sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-5xl font-extrabold text-accent sm:text-[4rem]">
            SWE Training
          </h1>
          <p className="pt-2 font-code text-primary-foreground">By RoBorregos</p>
          <p className="max-w-xl pt-4 font-main text-primary-foreground">
            A program for students interested in software engineering
            internships, focused on self learning and interview preparation.
          </p>
        </div>
        <Image src={logo} alt="Logo" className="h-40 w-fit" priority />
      </div>

      <div className="grid grid-cols-1 gap-6 font-main lg:grid-cols-2">
        <Card title="What is SWE Training?">
          <p>
            A program for students interested in software engineering
            internships. The plan involves a lot of self learning and covers the
            following:
          </p>
          <ul className="list-disc pl-6 pt-2">
            <li>Interview preparation</li>
            <li>Interview Mockups</li>
            <li>Resume workshop</li>
          </ul>
        </Card>

        <Card title="How does it work?">
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>
              For about 5 weeks, we&apos;ll be practicing coding problems
              following a weekly topic. Problem solutions will be presented each
              saturday.
            </li>
            <li>
              There will be a person selected to present each recommended
              problem, with the purpose of practicing the explanation process
              and sharing their approaches (they will be notified a few days
              before).
            </li>
            <li>
              Monday&apos;s at 6am, the set of weekly problems will be
              released.
            </li>
            <li>
              After the 5 weeks, we will have a workshop to review resumes and
              provide tips and examples.
            </li>
            <li>
              Finally, on the last week, we will have mock interviews to wrap up
              the program.
            </li>
            <li>
              Even after the training, make sure to check the chat, as it is
              common for people to share when new positions open.
            </li>
          </ul>
        </Card>

        <Card title="Suggestions">
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>
              The problems marked with a star are the ones that we recommend you
              to solve and the ones that will be presented every saturday.
            </li>
            <li>
              Try each problem really hard and avoid checking hints, this will
              take away from the learning experience and though process.
            </li>
            <li>
              Feel free to make questions in the chat but don&apos;t spoil
              solutions.
            </li>
          </ul>
        </Card>

        <Card title="Connect with leetcode">
          <p>
            Make sure to login and update your leetcode handle to keep track of
            solved problems. They will automatically update as long as your
            leetcode handle (username) is correct.
          </p>
          <p className="pt-2">
            Click on the user at the top right corner to access your profile.
          </p>
        </Card>

        <Card title="Resume Review">
          <p>
            Upload your resume (PDF) in the{" "}
            <Link href="/resume-review" className="text-accent underline">
              Resume Review
            </Link>{" "}
            page to get feedback. Reviewers will leave comments you can read
            there, and you can replace or delete your resume anytime.
          </p>
        </Card>
      </div>
    </div>
  );
}
