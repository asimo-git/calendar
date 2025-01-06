import fs from "fs";
import Image from "next/image";
import path from "path";
import styles from "./page.module.css";
import { githubBaseUrl, MONTHS } from "./utils/constants";

export default async function Home() {
  function getDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    return { day, month };
  }

  const currentDate = getDate();
  const currentKey = `${currentDate.day}-${currentDate.month}`;

  async function getContent(key: string) {
    const filePath = path.join(process.cwd(), "public", "data.json");

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    return (
      jsonData[key] ||
      "Пусть это будет просто день, в котором не происходит ничего особенного"
    );
  }

  const textContent = await getContent(currentKey);

  return (
    <div className={styles.page}>
      <h1 className={styles.date}>
        <span className={styles.number}>{currentDate.day}</span>
        <br></br>
        {MONTHS[currentDate.month]}
      </h1>
      <main className={styles.main}>
        <section className={styles.calendar}>
          <div className={styles.imageContainer}>
            <Image
              src={`${githubBaseUrl}${currentKey}.png`}
              alt="image of the day"
              width={300}
              height={0}
              layout="intrinsic"
            />
          </div>
        </section>
        <section className={styles.content}>
          <h2 className={styles.dayTitle}>Quitter&apos;s Day</h2>
          <div>{textContent}</div>
        </section>
      </main>
    </div>
  );
}
