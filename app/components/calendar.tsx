"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDayDescription } from "../services/supabase";
import {
  defaultDayDescription,
  defaultDayTitle,
  MONTHS,
} from "../utils/constants";
import {
  checkImageAvailability,
  getDate,
  registerServiceWorker,
} from "../utils/helpers";
import styles from "./calendar.module.css";

export default function Calendar() {
  const [data, setData] = useState({
    description: "",
    imageUrl: "",
    title: "",
  });
  registerServiceWorker();

  const [isImageAvailable, setIsImageAvailable] = useState<boolean | null>(
    null
  );

  const currentDate = getDate();
  const currentKey = `${currentDate.day}-${currentDate.month}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const { description, imageUrl, title } = await getDayDescription(
          currentKey
        );

        setData({ description, imageUrl, title });

        if (imageUrl) {
          const isAvailable = await checkImageAvailability(imageUrl);
          setIsImageAvailable(isAvailable);
        } else {
          setIsImageAvailable(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [currentKey]);

  return (
    <>
      <section className={styles.calendar}>
        <h2 className={styles.date}>
          <span className={styles.number}>{currentDate.day}</span>
          <br></br>
          {MONTHS[currentDate.month]}
        </h2>
        <div className={styles.imageContainer}>
          {isImageAvailable !== null && (
            <Image
              src={isImageAvailable ? data.imageUrl : "/default-img.png"}
              alt="image of the day"
              fill
              className={styles.dayImage}
            />
          )}
        </div>
      </section>
      <section className={styles.description}>
        <h3 className={styles.dayTitle}>{data.title ?? defaultDayTitle}</h3>
        <div className={styles.content}>
          {data.description !== null ? (
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          ) : (
            defaultDayDescription
          )}
        </div>
      </section>
    </>
  );
}
