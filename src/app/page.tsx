// Components
import Script from "next/script";
import { ListingCategories, ListingsGrid } from "@/components";

export default async function Home() {
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`}
      />
      <main>
        {/* <ListingCategories categories={categories} /> */}
        <ListingsGrid />
      </main>
    </>
  );
}
