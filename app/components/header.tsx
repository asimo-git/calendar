import styles from "./header.module.css";
import Menu from "./menu";

export default async function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Календарь дальней дороги</h1>
      <Menu />
    </header>
  );
}
