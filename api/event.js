import { db } from "../firebase";
import {
    collection,
    addDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const addEvent = async ({ userId, title, description, date }) => {
    try {
        await addDoc(collection(db, "event"), {
            user: userId,
            title: title,
            description: description,
            date: date,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};

const deleteEvent = async (docId) => {
    try {
        const eventRef = doc(db, "event", docId);
        await deleteDoc(eventRef);
    } catch (err) {
        console.log(err);
    }
};
export { addEvent, deleteEvent };