import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserService } from "../../../services/user.service";

import {Avatar } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import testAvatar from '../../../assets/test/testAvatar.jpg';

import styles from "./styles/UserDataCard.module.scss";

const UserDataCard = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const userData = useSelector(
    state => state.authStates.userData
  );

  useEffect(() => {
      const fetchData = async () => {
          return await UserService.getUserData(userData.uid);
      }

      if (userData && userData.uid) {
          fetchData().then(res => setUsername(res.username));
          fetchData().then(res => setEmail(res.email));
      }
    }, [userData]);

  return (
    <section className={styles.user__card}>
      <Avatar
        sx={{width: 40, height: 40,}}
        alt="avatar"
        src={testAvatar}
      />
        {
          username.length !== 0 && email.length !== 0 ?
          <div className={styles.user__card__info}>
            <span className={styles.user__card__name}>{username}</span>
            <span className={styles.user__card__email}>{email}</span>
          </div>
              :
          <div className={styles.loading}>
            <Skeleton animation='wave' width={200}/>
            <Skeleton animation='wave' width={150}/>
          </div>
        }
    </section>
  );
};

export default UserDataCard;
