import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sideContainer}>
      
    <div className={styles.sidebar}> 
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarTitle}>dashboard</div>
        <div className={styles.divider} />
      </div>
      <div className={styles.mainNavLinks}>
        <Link to="/">
          <div className={styles.navItem}>
            <i className={`ti ti-home ${styles.navIcon}`} aria-hidden="true" />
            <div className={styles.navText}>home</div>
          </div>
        </Link>
        <Link to="/myproperty">
          <div className={styles.navItem}>
            <i className={`ti ti-building ${styles.navIcon}`} aria-hidden="true" />
            <div className={styles.navText}>My properties</div>
          </div>
        </Link>
        <Link to="/listings">
          <div className={styles.navItem}>
            <i className={`ti ti-building-community ${styles.navIcon}`} aria-hidden="true" />
            <div className={styles.navText}>All properties</div>
          </div>
        </Link>
        <Link to="/settings">
          <div className={styles.navItem}>
            <i className={`ti ti-settings ${styles.navIcon}`} aria-hidden="true" />
            <div className={styles.navText}>settings</div>
          </div>
        </Link>
      </div>
      <div className={styles.bottomNavLinks}>
        <div className={styles.navItem} onClick={() => {
          const response = window.confirm('This will log off your session. Do you want to continue?');
          if (response) {
            window.location.href = '/login';
          }
        }}>
          <i className={`ti ti-logout ${styles.navIcon}`} aria-hidden="true" />
          <div className={styles.navText}>Logout</div>
        </div>
        <Link to="/help-support">
          <div className={styles.navItem}>
            <i className={`ti ti-help-circle ${styles.navIcon}`} aria-hidden="true" />
            <div className={styles.navText}>help &amp; support</div>
          </div>
        </Link>
        <Link to="/payments">
          <div className={styles.navItem}>
            <i className={`ti ti-credit-card ${styles.navIcon}`} aria-hidden="true" />
            <div className={styles.navText}>payments</div>
          </div>
        </Link>
      </div>
    </div>
    <Link to="/profile">
      <div className={styles.userProfile}>
        <div className={styles.userAvatar} />
        <div className={styles.userInfo}>
          <div className={styles.userName}>name</div>
          <div className={styles.userEmail}>abc@gmail.com</div>
        </div>
      </div>
    </Link>
    
    </div>
  );
}

export default Sidebar;

