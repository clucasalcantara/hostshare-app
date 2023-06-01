"use client";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/navigation";
// UI Elements
import { Search } from "../search";
import { Profile } from "../profile";
// Assets
import { MdMenu } from "react-icons/md";

export default function Header() {
  const { push } = useRouter();

  return (
    <header className="lg:border lg:shadow-md">
      <Head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        />
      </Head>
      <div className="flex flex-col lg:flex-row mx-8 lg:mx-28 mt-8 lg:mt-0 lg:py-8 lg:items-center justify-between">
        <div className="flex flex-row justify-between items-center ml-2 lg:ml-0">
          <Image
            onClick={() => push("/")}
            src="/hostshare-green.png"
            alt="hostshare Logo"
            width={180}
            height={44}
            priority
            className="cursor-pointer"
          />
          <div className="visible self-end pt-[10px] cursor-pointer sm:invisible">
            <MdMenu size={30} />
          </div>
        </div>
        <Search />
        <Profile />
      </div>
    </header>
  );
}
