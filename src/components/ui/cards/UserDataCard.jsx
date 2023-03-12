import React from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./styles/UserDataCard.module.scss";
import {useSelector} from "react-redux";

const UserDataCard = ({ name, email, photo }) => {
  const isLSidebarOpened = useSelector(
      state => state.sidebarStates.isLeftSidebarOpen
  );

  return (
    <section className={
        styles.user__card + `${!isLSidebarOpened ? ' ' + styles.closed : ''}`
    }>
      <Avatar
        sx={{
          width: 40,
          height: 40,
        }}
        alt="avatar"
        src={photo}
      />
      <div className={isLSidebarOpened ? '' : styles.user__card__wrap}>
        <div className={styles.user__card__info}>
          <span className={styles.user__card__name}>{name}</span>
          <span className={styles.user__card__email}>{email}</span>
        </div>
      </div>
    </section>
  );
};

export default UserDataCard;
