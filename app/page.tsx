import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.date}>
        <span className={styles.number}>10</span>
        <br></br>января
      </h1>
      <main className={styles.main}>
        <section className={styles.calendar}>
          <div className={styles.imageContainer}>
            <Image
              src="/28-12.png"
              alt="image of the day"
              width={300}
              height={0}
              layout="intrinsic"
            />
          </div>
        </section>
        <section className={styles.content}>
          <h2 className={styles.dayTitle}>Quitter's Day</h2>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque sit amet consectetur mi. Fusce id diam sed leo porta
            condimentum. Vivamus non nunc eget dolor malesuada aliquam. Donec
            elementum pulvinar tempor. Maecenas egestas arcu quis ante egestas
            finibus. In bibendum viverra urna. Nulla ut porttitor justo, id
            ullamcorper nisl. Vestibulum enim ante, cursus et ipsum at, suscipit
            tincidunt quam. Nam nec sapien nec diam tristique tincidunt.
            Praesent condimentum imperdiet felis, nec hendrerit purus bibendum
            a. In ullamcorper non libero in dignissim. Donec pharetra nibh in
            lectus imperdiet, vel interdum leo viverra. Aenean pharetra elit sed
            elementum rutrum. Curabitur tempus nec neque sit amet congue.
            Quisque tellus nibh, suscipit quis varius sit amet, volutpat vitae
            sem. Aenean a orci cursus, mattis nisi id, suscipit erat. Nunc
            gravida blandit rhoncus. Sed eget gravida erat. Phasellus in mi
            orci. Aliquam eget velit finibus ex mollis tincidunt a a lorem. Nunc
            rutrum ipsum sed interdum lacinia. Mauris et tristique lorem.
            Aliquam congue laoreet malesuada. Sed viverra blandit risus, ac
            ultricies erat rutrum at. Pellentesque porta dui a luctus fermentum.
          </div>
        </section>
      </main>
    </div>
  );
}
