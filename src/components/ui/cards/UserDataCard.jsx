import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./styles/UserDataCard.module.css";
import UIStates from "../../../context/UIStates.context";

const UserDataCard = ({ name, email, photo }) => {
  const { sidebars } = useContext(UIStates);

  return (
    <section className={styles.user__card + `${!sidebars.isLeftSidebarOpened ? ' ' + styles.closed : ''}`}>
      <Avatar
        sx={{
          width: 40,
          height: 40,
        }}
        alt="avatar"
        src={photo}
      />
      <div className={sidebars.isLeftSidebarOpened ? '' : styles.user__wrap}>
        <div className={styles.user__info}>
          <span className={styles.user__name}>{name}</span>

          <span className={styles.user__email}>{email}</span>
        </div>
      </div>
    </section>
  );
};

export default UserDataCard;
