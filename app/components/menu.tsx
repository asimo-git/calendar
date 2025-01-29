"use client";
import { useEffect, useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsSending(true);
    setSuccess(true);
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
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Календарь дальней дороги</h2>
            <div className={styles.textContent}>
              <p>
                Все, с чем мы сталкиваемся, путешествуя. То, что помогает,
                поддерживает или развлекает.
              </p>
              <p>В конце года здесь будет архив с описанием всех дней.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label>
                Сообщение авторам:
                <textarea
                  className={styles.textarea}
                  placeholder="Сообщить о неточности, предложить идею, поблагодарить или просто сказать привет!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </label>

              <button
                type="submit"
                disabled={isSending}
                className={styles.submitButton}
              >
                {isSending ? "Отправка..." : "Отправить"}
              </button>
            </form>

            {success && (
              <p className={styles.successMessage}>Сообщение отправлено!</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
