import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to Quiz Builder</h1>
        <p className={styles.description}>
          Create custom quizzes with various question types and manage them all
          in one place.
        </p>
        <div className={styles.actions}>
          <Link href="/create" className={styles.primaryButton}>
            Create Your First Quiz
          </Link>
          <Link href="/quizzes" className={styles.secondaryButton}>
            View All Quizzes
          </Link>
        </div>
      </div>

     
    </div>
  );
}
