"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false); // State to track if the responsive menu is open

  const { status } = useSession(); // Get authentication status from next-auth

  return (
    <>
      {status === "unauthenticated" ? ( 
        // Show Login link if user is not authenticated
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          {/* Show Write and Logout links if user is authenticated */}
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      
      {/* Hamburger menu icon for mobile/responsive view */}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Responsive menu links, shown when hamburger menu is clicked */}
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/" className={styles.link}>About us</Link>
          <Link href="/" className={styles.link}>
            Browse all courses <span className={styles.arrow}>›</span>
          </Link>
          <Link href="/" className={styles.link}>Webinar</Link>
          <Link href="/" className={styles.link}>Contact us</Link>
          {status === "notauthenticated" ? ( // Typo here: should be "unauthenticated"
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;

