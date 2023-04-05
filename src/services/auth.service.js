import { auth, db } from '../firebase.config';
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup, GoogleAuthProvider,
    sendEmailVerification, deleteUser, getAuth
} from 'firebase/auth';

import { doc, setDoc, getDoc } from 'firebase/firestore';

export class AuthService {

    static async createUserCollection(userId, username, email) {
         await setDoc(doc(db, 'users', userId), {
            username: username,
            email: email,
            user_id: userId
        });

         const userTasks = await getDoc(doc(db, 'tasks', userId));
         if (!userTasks.exists())
            await setDoc(doc(db, 'tasks', userId), {
                taskData: [],
                taskGroups: []
            });
    }
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
                    sendEmailVerification(creds.user)
                        .then(() => console.log("Email verification sent!"))
                        .catch(error => console.log(error))

                    await AuthService.createUserCollection(
                        userId, username, creds.user.email
                    );
                }
            })
            .catch(error => { throw error });
    }

    static async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async result => {
                if (result.user) {
                    const user = result.user;
                    await AuthService.createUserCollection(
                        result.user.uid, user.displayName, user.email);

                    return result.user;
                }
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
            })
            .catch(error => { throw error });
    }

    static async deleteUser() {
        const auth = getAuth();
        const user = auth.currentUser;
        await deleteUser(user);
    }
}