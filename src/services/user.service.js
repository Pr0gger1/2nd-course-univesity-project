import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';

export class UserService {
    static async getUserData(userId) {
        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                return docSnap.data()
            } 
            else {
                console.log("No such document!");
            }
        }
        catch (error) { throw error}
    }
}