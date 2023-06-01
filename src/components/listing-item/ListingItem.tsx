"use client";
import { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useAnimate,
  useInView,
} from "framer-motion";
import getDistance from "@/utils/calculateCoordinatesDistance";
import { useRouter } from "next/navigation";

export default function ListingItem({ info = [], from, to }: any) {
  const controls = useAnimationControls();
  const [scope] = useAnimate();
  const isInView = useInView(scope);
  const { push } = useRouter();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [isInView]);

  console.log({ info });

  const item = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
  };

  return (
    <motion.div
      className="flex flex-col min-h-[300px] cursor-pointer"
      variants={item}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 2 }}
      ref={scope}
      onClick={() => push(`/listing/${info.id}`)}
    >
      <Image
        className="rounded-2xl"
        src={info.mainImage.url}
        alt={info.title}
        width={400}
        height={400}
        style={{
          objectFit: "cover",
          width: "400px",
          height: "300px",
        }}
      />
      <div className="py-2 flex flex-col justify-between flex-1 gap-2 max-w-[400px]">
        <span className="font-bold text-md">{info.title}</span>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">
            {from && to && `${getDistance({ from, to })} miles away`}
          </span>
          <span className="font-bold self-start text-sm text-[#329a9a]">
            {info.currency.symbol} {info.price} night
          </span>
        </div>
      </div>
    </motion.div>
  );
}
