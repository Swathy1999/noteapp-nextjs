
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen m-5">
        <div className="md:grid md:grid-cols-2 gap-8 items-center">

          {/* Left Section */}
          <div>
            <h1 className="text-4xl font-bold text-green-400">
              Note Hub
            </h1>

            <h2 className="text-2xl text-green-300">
              Capture your thoughts...
            </h2>

            <p className="text-justify mt-4">
              A note-taking application is a versatile digital workspace
              designed to capture, organize, and retrieve information.
              It allows you to quickly jot down text, create checklists,
              and store multimedia. With cloud synchronization, your
              ideas are securely accessible across your devices, making
              it the perfect tool to boost productivity on the go.
            </p>
            <div className="my-5"> <Link href={'/login'} className="bg-green-500 text-white rounded-2xl px-6 py-3">Let's Start</Link></div>
          </div>

          <div className="flex justify-center">
            <Image
              width={400}
              height={400}
              src="/landing.gif"
              alt="Landing Image"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
