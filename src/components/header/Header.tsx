"use client";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/navigation";
// UI Elements
import { Search } from "../search";
import { Profile } from "../profile";

export default function Header() {
  const { push } = useRouter();

  return (
    <header className="bg-white border">
      <Head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        />
      </Head>
      <div className="flex flex-col lg:flex-row mx-6 lg:mx-28 py-8 items-center justify-between">
        <Image
          onClick={() => push("/")}
          src="/hostshare-green.png"
          alt="hostshare Logo"
          width={180}
          height={44}
          priority
          className="mb-6 lg:mb-0 cursor-pointer"
        />
        <Search />
        <Profile />
      </div>
    </header>
  );
}
