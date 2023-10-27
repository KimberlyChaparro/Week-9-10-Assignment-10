import React, { useState } from 'react';
import {
    Container,
    Input,
    Button,
    Text,
    Heading,
    GridItem,
    Grid,
    useBreakpointValue,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import { db } from "../../firebase";

// define the jsx component to show just one single to do in our ui
const TodoItem = ({ itemData }) => {
    const colSpan = useBreakpointValue({ base: 2, md: 1 });
    const [inputTitle, setInputTitle] = useState(itemData.title);
    const [inputDescription, setInputDescription] = useState(itemData.description);
    const [inputStatus, setInputStatus] = useState(itemData.status);
    const [statusMsg, setStatusMsg] = useState('');
    const toast = useToast();
    // enforce user login
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }
    // handle update of firestore document
    const sendData = async () => {
        console.log("sending! ", itemData);
        const docRef = doc(db, 'todo', itemData.id);
        updateDoc(
            docRef,
            {
                title: inputTitle,
                description: inputDescription,
                status: inputStatus
            }
        ).then(
            docRef => {
                setStatusMsg("Updated!");
                toast({
                    title: "Woohoo successfully updated", status: "success"
                });
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
        <Container maxW='8xl' centerContent mt="10">
            <Heading mb="10">Here you can update fields:</Heading>
            <Grid columns={2} columnGap={3} rowGap={6} w="50%">
                <GridItem colSpan={colSpan}>
                    <Text>Title:</Text>
                    <Input type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="Title" />
                </GridItem>

                <GridItem colSpan={colSpan}>
                    <Text>Description:</Text>
                    <Input type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} placeholder="Description" />
                </GridItem>

                <GridItem colSpan={colSpan}>
                    <Text>Status:</Text>
                    <Input type="text" value={inputStatus} onChange={(e) => setInputStatus(e.target.value)} placeholder="Status" />
                </GridItem>

                <GridItem colSpan={2}>
                    <Button
                        colorScheme="brand"
                        variant="solid"
                        size="lg"
                        w="full"
                        ml={2}
                        onClick={() => sendData()}
                    >
                        Update changes
                    </Button>
                </GridItem>


                <Text>
                    {new Date(itemData.createdAt).toLocaleDateString('en-US')}
                </Text>
                <Text>
                    {statusMsg}
                </Text>
            </Grid>

        </Container>



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
    const docRef = doc(db, 'todo', context.params.id);
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
export default TodoItem;
