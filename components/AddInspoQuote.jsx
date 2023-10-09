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
import { addInspo } from "../api/inspo";
const AddInspo = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleInspoCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create an inspiration quote",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const inspo = {
            title,
            description,
            userId: user.uid,
        };
        await addInspo(inspo);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        toast({ title: "Inspiration quote created successfully", status: "success" });
    };
    return (
        <Box w="80%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Inspiration Quote"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Author or Source"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    onClick={() => handleInspoCreate()}
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
export default AddInspo;