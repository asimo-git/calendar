"use client";

import Image from "next/image";
import { getDayDescription } from "../services/supabase";
import {
  defaultDayDescription,
  defaultDayTitle,
  MONTHS,
} from "../utils/constants";
import { getDate } from "../utils/helpers";
import styles from "./calendar.module.css";

export default async function Calendar() {
  const currentDate = getDate();
  console.log(currentDate);
  const currentKey = `${currentDate.day}-${currentDate.month}`;

  const { description, imageUrl, title } = await getDayDescription(currentKey);

  const isAvailable = imageUrl
    ? await fetch(imageUrl).then((res) => res.ok)
    : false;

  return (
    <>
      <section className={styles.calendar}>
        <h2 className={styles.date}>
          <span className={styles.number}>{currentDate.day}</span>
          <br></br>
          {MONTHS[currentDate.month]}
        </h2>
        <div className={styles.imageContainer}>
          <Image
            src={isAvailable ? imageUrl : "/default-img.png"}
            alt="image of the day"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </section>
      <section className={styles.description}>
        <h3 className={styles.dayTitle}>{title ? title : defaultDayTitle}</h3>
        <div className={styles.content}>
          {description ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            defaultDayDescription
          )}
        </div>
      </section>
    </>
  );
}
