import React from "react";
import {
    FormControl,
    Center,
    FormLabel,
    Text,
    Grid,
    GridItem,
    Input,
    Button,
    Heading,
    VStack,
    useToast,
    useBreakpointValue,
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
                title: "You must be logged in to create a contact",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        if (!name) {
            toast({
                title: "You must include name",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (!email) {
            toast({
                title: "You must include email",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (!phoneNumber) {
            toast({
                title: "You must include phone number",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (!birthday) {
            toast({
                title: "You must include birthday",
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
    const colSpan = useBreakpointValue({ base: 2, md: 1 });
    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Your Contacts</Heading>
                <Text>Here you can view and add contacts.</Text>
            </VStack>
            <Grid columns={2} columnGap={3} rowGap={6} w="full"
            >
                <GridItem colSpan={colSpan}>
                    <FormControl isRequired>
                        <FormLabel>Full name</FormLabel>
                        <Input
                            placeholder="John Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl isRequired>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            placeholder="777-777-7777"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="JohnSmith@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                    <FormControl isRequired>
                        <FormLabel>Birthday</FormLabel>
                        <Input
                            id="birthday"
                            placeholder="Birthday"
                            type="date"
                            min="1923-10-22"
                            max=""
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </FormControl>
                </GridItem>


                <GridItem colSpan={2} >
                    <Button
                        onClick={() => handleContactCreate()}
                        disabled={name.length < 1 || phoneNumber.length < 1 || email.length < 1 || birthday.length < 1 || isLoading}
                        colorScheme="brand"
                        variant="solid"
                        size="lg"
                        w="full"
                    >
                        Add
                    </Button>
                </GridItem>


            </Grid>
        </VStack>
    );
};
export default AddContact;