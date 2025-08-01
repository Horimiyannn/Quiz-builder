import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Quiz Builder",
  description: "Create and manage custom quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <h1 className={styles.logo}>
                <Link href="/" className={styles.logoLink}>
                  Quiz Builder
                </Link>
              </h1>
              <nav className={styles.nav}>
                <a href="/quizzes" className={styles.navLink}>
                  Quizzes
                </a>
                <a href="/create" className={styles.navLink}>
                  Create Quiz
                </a>
              </nav>
            </div>
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
