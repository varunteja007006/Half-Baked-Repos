import Image from "next/image";
import React from "react";
import ContactIcons from "./contact-icons";
import { Button } from "@/components/ui/button";
import { HiDownload } from "react-icons/hi";

export default function Intro() {
  return (
    <section
      id="intro"
      className="space-y-4 min-h-[calc(100vh-10rem)] items-center flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 gap-5 items-start p-2 md:grid-cols-3 md:p-5">
        <div className="flex flex-col gap-5 items-center">
          <Image
            alt="profile"
            src={"/profile.webp"}
            width={400}
            height={400}
            className="w-full h-auto rounded-lg"
            unoptimized={true}
            priority={true}
          />
          <div>
            <Button
              variant={"outline"}
              className="text-lg font-bold ring-1 dark:ring-purple-300"
              asChild
            >
              <a download href="/resume_varun.pdf">
                Download my resume <HiDownload className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="col-span-2 p-2 space-y-4 text-base leading-loose text-center md:px-10">
          <div>
            Hi 👋, I am a Software Engineer at Invest4Edu, an Ed-Fintech (as in
            both Education as well as Finance based) startup where I build web
            apps using <strong>Next.js, React, Node.js, and MSSQL.</strong>
          </div>
          <div>
            My tech stack for the frontend includes{" "}
            <strong>Next.js, React.js, and Tailwind CSS</strong>. For the
            backend, I use{" "}
            <strong>Node.js, Express.js, MSSQL and MongoDB</strong> also I have
            a strong understanding of both <strong>SQL and NoSQL</strong>. I
            started my journey with basics of{" "}
            <strong>HTML, CSS, SCSS, a little of Javascript, PHP and</strong>{" "}
            also <strong>Django</strong> (<strong>Python</strong> based web
            framework). Now I have a good understanding of them especially
            Javascript 😉.
          </div>
          <div>
            I am passionate about learning and keep my skills updated. Currently
            I am learning <strong>Django-Rest-Framework</strong>. Also plan to
            learn <strong>Go, Rust, and C</strong>. (Fascinated about the low
            level stuff ✨){""}
          </div>
          <div>
            I also use various tools for productivity, code management and
            benchmarking like{" "}
            <strong>Git, VS Code, Postman, SonarQube, and Jenkins</strong>.
          </div>
          <div>
            I am open to new opportunities so feel free to reach out to me 🤝.
          </div>
          <div className="font-semibold">- Varun Teja</div>
          <div>
            <ContactIcons className="" />
          </div>
        </div>
      </div>
    </section>
  );
}
