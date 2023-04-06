import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';

export class UserService {
    static updateUser(userInstance, newUsername = null, newAvatar = null) {
        const newData = {};
        if (newUsername) newData.displayName = newUsername;
        if (newAvatar) newData.photoURL = newAvatar;


        if (Object.keys(newData).length)
            return updateProfile(userInstance, {...newData})
                .then(() => {
                    return auth.currentUser;
                })
                .catch(error => console.log(error));
        return auth.currentUser;
    }
}