import { db } from "../firebase";
import {
    collection,
    addDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const addContact = async ({ userId, name, phoneNumber, email, birthday }) => {
    try {
        await addDoc(collection(db, "contact"), {
            user: userId,
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            birthday: birthday,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};

const deleteContact = async (docId) => {
    try {
        const contactRef = doc(db, "contact", docId);
        await deleteDoc(contactRef);
    } catch (err) {
        console.log(err);
    }
};
export { addContact, deleteContact };