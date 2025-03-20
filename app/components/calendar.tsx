"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDayDescription } from "../services/supabase";
import styles from "../styles/calendar.module.css";
import {
  DEFAULT_DAY_DESCRIPTION,
  DEFAULT_DAY_TITLE,
  MONTHS,
} from "../utils/constants";
import {
  checkImageAvailability,
  getDate,
  registerServiceWorker,
} from "../utils/helpers";

export default function Calendar() {
  const [data, setData] = useState({
    description: "",
    imageUrl: "",
    title: "",
  });
  registerServiceWorker();

  const [loading, setLoading] = useState(true);
  const [isImageAvailable, setIsImageAvailable] = useState<boolean | null>(
    null
  );

  const currentDate = getDate();
  const currentKey = `${currentDate.day}-${currentDate.month}`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
              placeholder="blur"
              blurDataURL="/loader.gif"
            />
          )}
        </div>
      </section>

      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          <section className={styles.description}>
            {" "}
            <h3 className={styles.dayTitle}>
              {data.title ?? DEFAULT_DAY_TITLE}
            </h3>
            <div className={styles.content}>
              {data.description !== null ? (
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              ) : (
                DEFAULT_DAY_DESCRIPTION
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
