import React from 'react'
import Avatar from '@mui/material/Avatar'
import styles from './styles/UserDataCard.module.css';

const UserDataCard = ({name, email, photo}) => {
  return (
    <section className={styles.user__card}>
          <Avatar sx={{
            width: 60,
            height: 60
          }} alt="avatar" src={photo}/>

        <div className={styles.user__info}>
          <span className={styles.user__name}>
            {name}
          </span>
          <span className={styles.user__email}>
            {email}
          </span>
        </div>
        
    </section>
  )
}

export default UserDataCard;
