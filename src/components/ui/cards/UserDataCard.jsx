import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import styles from './styles/UserDataCard.module.css';
import UIStates from '../../../context/UIStates.context';

const UserDataCard = ({ name, email, photo }) => {
  const {sidebars} = useContext(UIStates);

  return (
    <section className={styles.user__card}>
        <Avatar sx={{
            width: 30,
            height: 30
          }} alt="avatar" src={photo}
        />

        {
          sidebars.isLeftSidebarOpened &&
          <div className={styles.user__info}>
          
          <span className={styles.user__name}>
            {name}
          </span>

          <span className={styles.user__email}>
            {email}
          </span>

        </div>
        }
    </section>
  )
}

export default UserDataCard;
