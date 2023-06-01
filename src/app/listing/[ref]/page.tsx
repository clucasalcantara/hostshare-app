import ListingPage from "./ListingPage";

export default async function ListingPageRoute({ params, searchParams }: any) {
  const { listing } = await fetch(
    `http://localhost:3000/api/listing?ref=${params.ref}`
  ).then((res) => res.json());

  return <ListingPage data={listing} />;
}
