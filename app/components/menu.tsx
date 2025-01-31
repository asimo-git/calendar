"use client";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import MenuIcon from "./menu-icon";
import styles from "./menu.module.css";

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmited, setIsSubmited] = useState<boolean | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef(0);

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsClosing(true);
    if (overlayRef.current) {
      overlayRef.current.addEventListener(
        "animationend",
        () => {
          setIsModalOpen(false);
          setIsSubmited(null);
          setIsClosing(false);
        },
        { once: true }
      );
    }
  }, []);

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchEndY - touchStartY.current < -100) {
      handleCloseModal();
    }
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

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

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

  const handleEscPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
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
  }, [isModalOpen, handleEscPress]);

  return (
    <>
      <MenuIcon onClick={handleMenuClick} />

      {isModalOpen && (
        <div
          ref={overlayRef}
          className={`${styles.modalOverlay} ${isClosing ? styles.hidden : ""}`}
          onClick={handleCloseModal}
        >
          <div
            className={`${styles.modal} ${isClosing ? styles.hidden : ""}`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e: React.TouchEvent) =>
              (touchStartY.current = e.touches[0].clientY)
            }
            onTouchEnd={handleTouchEnd}
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
