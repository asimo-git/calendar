"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmited, setIsSubmited] = useState<boolean | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmited(null);
      setIsClosing(false);
    }, 1000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      setIsSubmited(result.success);
      if (result.success) setMessage("");
    } catch (error) {
      setIsSubmited(false);
      console.error("Ошибка отправки:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscPress);
    } else {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleEscPress);
    }

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [isModalOpen]);

  return (
    <>
      <svg
        width="50px"
        height="30px"
        viewBox="0 0 24 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.menuIcon}
        onClick={handleMenuClick}
      >
        <circle cx="5" cy="12" r="2" stroke="#fff196" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" stroke="#fff196" strokeWidth="1.5" />
        <circle cx="19" cy="12" r="2" stroke="#fff196" strokeWidth="1.5" />
      </svg>

      {isModalOpen && (
        <div
          className={`${styles.modalOverlay} ${isClosing ? styles.hidden : ""}`}
          onClick={handleCloseModal}
        >
          <div
            className={`${styles.modal} ${isClosing ? styles.hidden : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Календарь дальней дороги</h2>
            <div className={styles.textContent}>
              <p>В конце года здесь будет архив с описанием всех дней.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label>
                А сейчас вы можете отправить сообщение авторам:
                <div className={styles.textareaContainer}>
                  <textarea
                    className={styles.textarea}
                    placeholder="Сообщить о неточности, предложить идею, поблагодарить или просто сказать привет!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setIsSubmited(null)}
                    required
                  />
                </div>
              </label>
              <div className={styles.successMessage}>
                {isSubmited !== null &&
                  (isSubmited ? (
                    <p>Сообщение отправлено!</p>
                  ) : (
                    <p>Ошибка отправки</p>
                  ))}
              </div>

              <button
                type="submit"
                disabled={isSending || !message}
                className={styles.submitButton}
              >
                {isSending ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
