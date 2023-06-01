import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function LoadingState() {
  return (
    <section className="w-full py-16 flex h-screen flex-col justify-center items-center">
      <ClimbingBoxLoader color="#329a9a" size={30} speedMultiplier={1.5} />
    </section>
  );
}
