"use client";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";

import { ListingItem } from "../listing-item";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

import { useAppStore } from "@/store";
import { uniqBy } from "lodash";

export default function ListingsGrid({ data = [] }: any) {
  const [location, setLocation] = useState<any>({});
  const {
    filters: { location: filterLocation },
  } = useAppStore();
  const {
    data: response,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ["listings"],
    async ({ pageParam = 1 }) =>
      await fetch(
        `/api/listings?page=${pageParam}${
          filterLocation ? `&location=${filterLocation}` : ""
        }`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.page < lastPage.data.pages) {
          return lastPage.data.page + 1;
        }
      },
    }
  );

  const { pages } = response || { pages: [] };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({ latitude, longitude });
        }
      );
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [filterLocation, refetch]);

  const { data: lastPageData } = pages.length && pages[pages.length - 1];

  const dataset = (pages as []).reduce((acc: any, next: any) => {
    return [...acc, ...next.data?.listings];
  }, []);

  const listing = filterLocation ? uniqBy(dataset, "ref") : dataset;

  return (
    <InfiniteScroll
      dataLength={pages.length * 20}
      next={() => fetchNextPage()}
      hasMore={!!(lastPageData?.page === pages.length)}
      loader={isLoading && <h4>Loading...</h4>}
    >
      <motion.div
        initial="hidden"
        animate="show"
        layout
        className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        variants={container}
      >
        {!isLoading &&
          listing.length > 0 &&
          listing.map(({ info, ref }: any, idx: number) => {
            const from = {
              latitude: location.latitude,
              longitude: location.longitude,
            };
            const to = {
              latitude: info.location.lat,
              longitude: info.location.long,
            };

            return (
              <ListingItem
                key={`${ref}=${idx}`}
                info={info}
                to={to}
                from={from}
              />
            );
          })}
        {!isLoading && !hasNextPage && (
          <div className="self-center text-center">
            <span className="font-bold">The End!</span> Yay! time to decide!
          </div>
        )}
      </motion.div>
    </InfiniteScroll>
  );
}
