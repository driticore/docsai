import { Footer } from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { VideoSection } from "@/components/VideoSection";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const {userId} = await auth();
  const isAuth = !!userId;
  return (
    <>
        <Navbar />
        <MaxWidthWrapper className="md:py-52 py-32 h-screen flex flex-col items-center justify-center text-center">
          <div>
            <h1 className="text-[2.5rem] font-[400]">
              Create Documents Effortlessly with{" "}
              <span className="text-primary-foreground">DocsAI</span>
            </h1>
            <p className="md:mx-32 mx-0 mt-5">
              <span className="text-primary-foreground">DocsAI</span> empowers you to
              generate professional documents in multiple formats with just a few
              clicks. Streamline your workflow, save time, and focus on what truly
              matters.
            </p>
          </div>
          <div className="mt-10 flex gap-10">
            {isAuth ? (
            <Link href="/pages/features">
            <Button variant="default" size="lg">
              Create Today
            </Button>
          </Link>
            ):(
              <SignedOut>
                <SignInButton/>
              </SignedOut>
            )}

            <Link href="#">
              <Button variant="secondary" size="lg">
                Visit Community
              </Button>
            </Link>
          </div>
          <span className="text-sm mt-7">Free for personal use</span>
        </MaxWidthWrapper>
        <section className="hidden md:flex py-20 justify-center mx-10 bg-transparent">
          <MaxWidthWrapper className=" flex gap-10 flex-col md:flex-row justify-center items-center  bg-primary-foreground rounded-3xl md:p-14 pt-10 text-center">
            <div className="w-1/2">
              <h1 className="text-4xl font-semibold mb-5">How it works</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
                est maiores voluptates nesciunt dolorem cupiditate qui ratione!
                Nobis dolore quis voluptate soluta rerum numquam, laudantium
                distinctio animi repellat quam possimus!
              </p>
              <div className="mt-10 justify-center flex gap-10">
                <Link href="#">
                  <Button variant="default" size="lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
              <VideoSection />
        
          </MaxWidthWrapper>
        </section>
        <Footer/>
    </>
  );
}
