import { db } from "../firebase";
import {
    collection,
    addDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const addInspo = async ({ userId, title, description }) => {
    try {
        await addDoc(collection(db, "inspo"), {
            user: userId,
            title: title,
            description: description,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};

const deleteInspo = async (docId) => {
    try {
        const inspoRef = doc(db, "inspo", docId);
        await deleteDoc(inspoRef);
    } catch (err) {
        console.log(err);
    }
};
export { addInspo, deleteInspo };