import React, {useContext, useState} from 'react';
import { useDispatch } from "react-redux";
import {
    Button, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle
} from "@mui/material";
import { ThemedDialog } from "./ThemedDialog";
import { updateUserProfile } from "../../../store/reducers/AuthSlice";
import StorageService from "../../../services/storage.service";
import { SnackbarContext } from "../../../context/SnackbarContext";

const EditAvatarDialog = ({ dialogOpen, setDialogOpen }) => {
    const { setOpen, setType, setMessage } = useContext(SnackbarContext);
    const dispatch = useDispatch();
    const [newAvatar, setNewAvatar] = useState(null);

    const onCloseDialogClick = () => {
        setDialogOpen(false);
        setNewAvatar(null)
    }

    const onChangeAvatarSubmit = () => {
        if (newAvatar) {
            dispatch(updateUserProfile({
                username: null,
                avatar: newAvatar
            }));

            setDialogOpen(false);
        }
    }

    const onChangeFile = async event => {
        if (event.target.files) {
            const file = event.target.files[0];
            setNewAvatar(file);

            await StorageService.uploadAvatar(file)
        }
    }

    return (
        <ThemedDialog
            open={dialogOpen}
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
                    onChange={async e => await onChangeFile(e)}
                    type='file'
                    accept='image/png, image/jpg, image/jpeg'
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