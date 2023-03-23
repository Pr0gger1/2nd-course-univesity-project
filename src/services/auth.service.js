import { auth, db } from '../firebase.config';
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword } from 'firebase/auth';

import { doc } from 'firebase/firestore';

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
                    await db.setDoc(doc('users', userId, {
                        username,
                        email: creds.user.email,
                        user_id: creds.user.uid
                    }))
                }
            })
            .catch(error => { throw error });
    }
}