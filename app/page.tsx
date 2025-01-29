import Calendar from "./components/calendar";
import Header from "./components/header";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Calendar></Calendar>
      </main>
    </div>
  );
}
