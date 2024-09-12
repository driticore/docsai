import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen justify-center flex flex-1 items-center">
      <SignUp />
    </div>
  );
}
