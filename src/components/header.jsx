import Image from "next/image";
import Link from "next/link";

export default function Header () {
    return (
        <header className="flex px-10 md:px-[140px] py-4 items-center justify-between">
            <Link href={"/"} className="flex items-center">
            <Image src={"/logo.png"} width={100} height={100} className="w-10 md:w-12" alt="Logo" />
            <p className="ml-3 text-xl md:text-2xl font-bold text-secondary uppercase ">Librisys</p>
            </Link>
        </header>
    )
}