"use client";
import styles from "../styles/menu-icon.module.css";

export default function MenuIcon({ onClick }: { onClick: () => void }) {
  return (
    <svg
      width="50px"
      height="30px"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.menuIcon}
      onClick={onClick}
    >
      <circle cx="5" cy="12" r="2" stroke="#fff196" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" stroke="#fff196" strokeWidth="1.5" />
      <circle cx="19" cy="12" r="2" stroke="#fff196" strokeWidth="1.5" />
    </svg>
  );
}
