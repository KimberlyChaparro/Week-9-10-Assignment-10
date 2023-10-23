import React, { useState } from 'react';
import {
    Heading,
    Flex,
    InputGroup,
    Input,
    Button,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import { db } from "../../firebase";

// define the jsx component to show just one single to do in our ui
const ContactItem = ({ itemData }) => {
    const [inputName, setInputName] = useState(itemData.name);
    const [inputPhoneNumber, setInputPhoneNumber] = useState(itemData.phoneNumber);
    const [inputEmail, setInputEmail] = useState(itemData.email);
    const [inputBirthday, setInputBirthday] = useState(itemData.birthday);
    const [statusMsg, setStatusMsg] = useState('');
    // enforce user login
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }
    // handle update of firestore document
    const sendData = async () => {
        console.log("sending! ", itemData);
        const docRef = doc(db, 'contact', itemData.id);
        updateDoc(
            docRef,
            {
                name: inputName,
                phoneNumber: inputPhoneNumber,
                email: inputEmail,
                birthday: inputirthday
            }
        ).then(
            docRef => {
                setStatusMsg("Updated!");
            }
        ).catch(
            error => {
                console.log(error);
                setStatusMsg("Error!");
            }
        );
    }
    // if our code continues execution to here, a user is logged in
    // finally return the jsx component
    return (
        <Flex flexDir="column" maxW={800} align="center" justify="start" minH="100vh" m="auto" px={4} py={3}>
            <InputGroup>
                <Input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Name" />
                <Input type="text" value={inputPhoneNumber} onChange={(e) => setInputPhoneNumber(e.target.value)} placeholder="Phone Number" />
                <Input type="text" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="Email" />
                <Input type="text" value={inputBirthday} onChange={(e) => setInputBirthday(e.target.value)} placeholder="Birthday" />
                <Button
                    ml={2}
                    onClick={() => sendData()}
                >
                    Update
                </Button>
            </InputGroup>
            <Text>
                {itemData.status}
            </Text>
            <Text>
                {new Date(itemData.createdAt).toLocaleDateString('en-US')}
            </Text>
            <Text>
                {statusMsg}
            </Text>
        </Flex>
    );
};

// define the REQUIRED getServerSideProps() function that Next.js will call
// when it gets a dynamically-routed URL: /todo/blah <- here the id will = blah
export async function getServerSideProps(context) {
    // our function will receive all it needs from Next.js in context variable
    // if we want to get the url parameter that next.js set for id 'cause [id].js
    // context.params.id has it!
    let itemData = null;
    // get a doc from firestore collection
    const docRef = doc(db, 'contact', context.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        itemData = {
            id: docSnap.id,
            ...docSnap.data()
        };
    }

    return {
        props: {
            itemData
        }
    };
}

// export the component
export default ContactItem;
