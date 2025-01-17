import Calendar from "./components/calendar";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className={styles.page}>
      <header>
        <h1 className={styles.title}>Календарь дальней дороги</h1>
      </header>
      <main className={styles.main}>
        <Calendar></Calendar>
      </main>
    </div>
  );
}
