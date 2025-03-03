import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full bg-[url('/blob-scene.svg')] bg-cover bg-center bg-no-repeat">
      <Header />
      <main>
        <section className="px-10 md:px-[140px]">
          <div className="flex w-full flex-col md:flex-row md:justify-between md:items-center">
            <div className="w-full md:w-1/2">
              <h1 className="font-bold text-2xl text-primary mt-24">
              <span className="text-secondary">Discover Books:</span> Search, Check, and Borrow
              </h1>
              <p className="text-base font-medium text-gray-900">Your one-stop tool for finding, checking availability, and borrowing books. Effortlessly search our extensive database, verify your membership, and take home your next favorite read.</p>
              <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 space-y-3 md:space-y-0 mt-7">
               {/*<Link href={"join"} className="hover:ring-2 hover:ring-current w-max py-2 md:py-4 md:px-8 px-4 rounded-full bg-slate-300 text-secondary text-base" title="register">Become a member</Link> */} 
                <Link href={"/search"} className="hover:ring-2 hover:ring-primary w-max py-2 md:py-4 md:px-8 px-4 rounded-full bg-secondary text-white text-base" title="search">Find Books</Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Image src={"/no-libarian.png"} alt="No Liberian" height={400} width={400} className="w-full object-center object-contain" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
