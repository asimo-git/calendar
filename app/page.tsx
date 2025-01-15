import Image from "next/image";
import styles from "./page.module.css";
import { getDayDescription } from "./services/supabase";
import {
  defaultDayDescription,
  defaultDayTitle,
  MONTHS,
} from "./utils/constants";
import { getDate } from "./utils/helpers";

export default async function Home() {
  const currentDate = getDate();
  const currentKey = `${currentDate.day}-${currentDate.month}`;

  const { description, imageUrl, title } = await getDayDescription(currentKey);

  const isAvailable = imageUrl
    ? await fetch(imageUrl).then((res) => res.ok)
    : false;

  return (
    <div className={styles.page}>
      <header>
        <h1 className={styles.title}>Календарь дальней дороги</h1>
      </header>
      <main className={styles.main}>
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
      </main>
    </div>
  );
}
