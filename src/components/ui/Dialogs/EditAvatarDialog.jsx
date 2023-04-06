import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
    Button, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle
} from "@mui/material";
import { ThemedDialog } from "./ThemedDialog";
import { updateUserProfile } from "../../../store/reducers/AuthSlice";

const EditAvatarDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const [newAvatar, setNewAvatar] = useState(null);

    const onCloseDialogClick = () => {
        setOpen(false);
        setNewAvatar(null)
    }

    const onChangeAvatarSubmit = () => {
        if (newAvatar) {
            dispatch(updateUserProfile({
                username: null,
                avatar: newAvatar
            }))
        }
    }

    const onChangeFile = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            console.log(event.target.files)
            if (/(\.jpg|\.jpeg|\.png)$/.test(file))
                setNewAvatar(event.target.files[0])
        }
    }

    return (
        <ThemedDialog
            open={open}
            onClose={onCloseDialogClick}
        >
            <DialogTitle>
                Изменение аватара пользователя
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Выберите изображение для аватара
                </DialogContentText>

                <input
                    onChange={onChangeFile}
                    type='file'
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant='text'
                    onClick={onCloseDialogClick}
                >
                    Отмена
                </Button>
                <Button
                    variant='text'
                    color='error'
                    onClick={onChangeAvatarSubmit}
                >
                    Подтвердить
                </Button>
            </DialogActions>
        </ThemedDialog>
    );
};

export default EditAvatarDialog;