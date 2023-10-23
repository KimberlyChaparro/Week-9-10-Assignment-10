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
import { addEvent } from "../api/event";
const AddEvent = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
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
        setIsLoading(true);
        const event = {
            title,
            description,
            userId: user.uid,
        };
        await addEvent(event);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        toast({ title: "Event created successfully", status: "success" });
    };
    return (
        <Box w="80%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Event name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Event details"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    onClick={() => handleEventCreate()}
                    disabled={title.length < 1 || description.length < 1 || isLoading}
                    colorScheme="purple"
                    variant="solid"
                >
                    Add
                </Button>
            </Stack>
        </Box>
    );
};
export default AddEvent;