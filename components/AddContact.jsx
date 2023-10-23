import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addContact } from "../api/contact";
const AddContact = () => {
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleContactCreate = async () => {
        if (!isLoggedIn) {
            toast({
                name: "You must be logged in to create a contact",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const contact = {
            name,
            phoneNumber,
            email,
            birthday,
            userId: user.uid,
        };
        await addContact(contact);
        setIsLoading(false);
        setName("");
        setPhoneNumber("");
        setEmail("");
        setBirthday("");
        toast({ title: "Contact created successfully", status: "success" });
    };
    return (
        <Box w="80%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Contact name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                    placeholder="Contact phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Input
                    placeholder="Contact email"
                    value={email}
                    type="email"
                    label="Email"
                    isRequired
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Textarea
                    placeholder="Contact birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <Button
                    onClick={() => handleContactCreate()}
                    disabled={name.length < 1 || phoneNumber.length < 1 || email.length < 1 || birthday.length < 1 || isLoading}
                    colorScheme="purple"
                    variant="solid"
                >
                    Add
                </Button>
            </Stack>
        </Box>
    );
};
export default AddContact;