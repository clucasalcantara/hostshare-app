/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  motion,
  useAnimate,
  useAnimationControls,
  useInView,
} from "framer-motion";

import { AiFillStar } from "react-icons/ai";
import { IoMdShare, IoMdHeartEmpty } from "react-icons/io";
import PhotoAlbum from "react-photo-album";
import { LoadingState } from "@/components/loading-state";

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

export default function ListingPage({ params }: any) {
  const controls = useAnimationControls();
  const [scope] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [controls, isInView]);

  const { data } = useQuery(
    ["listings"],
    async () =>
      await fetch(`/api/listing?ref=${params.ref}`).then((result) =>
        result.json()
      ),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.page < lastPage.data.pages) {
          return lastPage.data.page + 1;
        }
      },
    }
  );

  const { info: listing } = data || {};

  if (!listing) {
    return <LoadingState />;
  }

  const photogridData = listing.images?.data.map((image: any) => {
    return {
      ...image,
      src: image.url,
    };
  });

  return (
    <section className="w-full py-16 flex flex-col">
      <div className="mx-28 flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-[24pt] font-bold">{listing.title}</h1>
          <div className="w-full flex flex-row justify-between">
            <div className="w-[80%] flex flex-row gap-4 items-center py-4 divide-x">
              <div className="flex flex-row items-center gap-1 px-4">
                <AiFillStar />
                <span>{listing.ratings?.guestSatisfactionOverall}</span>
              </div>
              <div className="flex flex-row items-center gap-1 px-4">
                <span className="underline text-black">
                  {listing.visibleReviewCount} reviews
                </span>
              </div>
              <div className="flex flex-row items-center gap-1 px-4">
                <span className="text-black">
                  {`${listing.location?.address} ${listing.location?.city}, ${listing.location?.country.title}`}
                </span>
              </div>
            </div>
            <div className="w-[15%] gap-4 flex flex-row items-center divide-x">
              <div className="flex flex-row items-center gap-2 px-4">
                <IoMdShare size={24} />
                <span>Share</span>
              </div>
              <div className="flex flex-row items-center gap-2 px-4">
                <IoMdHeartEmpty size={24} />
                <span>Save</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-h-[530px] overflow-hidden flex flex-row">
          <div className="w-full max-h-[530px]">
            <img src={listing.mainImage?.url} alt="main image" />
          </div>
          <motion.div className="w-full max-h-[580px]  overflow-hidden">
            <PhotoAlbum layout="rows" photos={photogridData} />
          </motion.div>
        </div>
        <div className="mt-8 w-full flex flex-row justify-between">
          <div>
            <h3 className="text-[14pt] font-bold">
              Entire {listing.type} hosted by {listing.host?.name}
            </h3>
            <div className="flex-0 flex-row justify-between gap-4 divide-x mt-2 ml-[-10px]">
              {listing.details?.data.map((detail: any) => (
                <span key={detail.type} className="px-3">
                  {detail.value} {detail.type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
