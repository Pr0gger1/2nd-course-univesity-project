import React from 'react'
import Avatar from '@mui/material/Avatar'

const UserDataCard = ({name, email, photo}) => {
  return (
    <div>
        <div>
          <Avatar alt="avatar" src={photo}/>
        </div>
        <div>{name}</div>
        <div>{email}</div>
    </div>
  )
}

export default UserDataCard;
