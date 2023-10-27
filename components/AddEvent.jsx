import React from "react";
import {
    Heading,
    VStack,
    Form,
    FormLabel,
    Grid,
    GridItem,
    useBreakpointValue,
    Input,
    Button,
    Textarea,
    Text,
    useToast,
    FormControl,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addEvent } from "../api/event";
const AddEvent = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleEventCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create an event",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (!title) {
            toast({
                title: "You must include a title to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (!description) {
            toast({
                title: "You must include a description to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (!date) {
            toast({
                title: "You must include a date to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        const event = {
            title,
            description,
            date,
            userId: user.uid,
        };
        await addEvent(event);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setDate("");
        toast({ title: "Event created successfully", status: "success" });
    };
    const colSpan = useBreakpointValue({ base: 2, md: 1 });
    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Your Events</Heading>
                <Text>Here you can view and add events.</Text>
            </VStack>
            <Grid columns={2} columnGap={3} rowGap={6} w="full"
            >
                <GridItem colSpan={colSpan}>
                    <FormControl isRequired>
                        <FormLabel>Event name:</FormLabel>
                        <Input
                            placeholder="2023 Next.js Conference"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={colSpan}>
                    <FormControl isRequired>
                        <FormLabel>Date</FormLabel>
                        <Input
                            id="date"
                            placeholder="Date"
                            type="date"
                            min="1923-10-22"
                            max=""
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                    <FormControl isRequired>
                        <FormLabel>Event Details:</FormLabel>
                        <Textarea
                            placeholder="Keynote presentation with updates"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={2} >
                    <Button
                        onClick={() => handleEventCreate()}
                        disabled={title.length < 1 || description.length < 1 || date.length < 1 || isLoading}
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
export default AddEvent;