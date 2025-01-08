import Image from "next/image";
import styles from "./page.module.css";
import { getDayDescription } from "./services/supabase";
import { defaultDayDescription, MONTHS } from "./utils/constants";
import { getDate } from "./utils/helpers";

export default async function Home() {
  const currentDate = getDate();
  const currentKey = `${currentDate.day}-${currentDate.month}`;

  const { description, imageUrl } = await getDayDescription(currentKey);

  const isAvailable = imageUrl
    ? await fetch(imageUrl).then((res) => res.ok)
    : false;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.calendar}>
          <h1 className={styles.date}>
            <span className={styles.number}>{currentDate.day}</span>
            <br></br>
            {MONTHS[currentDate.month]}
          </h1>
          <div className={styles.imageContainer}>
            <Image
              src={isAvailable ? imageUrl : "/default-img.jpg"}
              alt="image of the day"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </section>
        <section className={styles.description}>
          <h2 className={styles.dayTitle}>Quitter&apos;s Day</h2>
          <div className={styles.content}>
            {description ? description : defaultDayDescription}
          </div>
        </section>
      </main>
    </div>
  );
}
