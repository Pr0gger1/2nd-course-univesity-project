import { auth, db } from '../firebase.config';
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword } from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

export class AuthService {
    static async login(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
            .then(creds => {
                if (creds.user) return creds.user;
            })
            .catch(error => { throw error });
    }

    static async register(email, password, username) {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async creds => {
                if (creds.user) {
                    const userId = creds.user.uid;
                    console.log(creds.user);
                    await setDoc(doc(db, 'users', userId), {
                        username: username,
                        email: creds.user.email,
                        user_id: creds.user.uid
                    });

                    await setDoc(doc(db, 'tasks', userId), {
                        taskData: []
                    });
                }
            })
            .catch(error => { throw error });
    }
}