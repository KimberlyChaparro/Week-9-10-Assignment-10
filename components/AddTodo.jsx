import React from "react";
import {
    FormControl,
    FormLabel,
    VStack,
    Heading,
    Text,
    Grid,
    GridItem,
    Input,
    Button,
    Textarea,
    Select,
    useToast,
    useBreakpointValue,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";
const AddTodo = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleTodoCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a todo",
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


        setIsLoading(true);
        const todo = {
            title,
            description,
            status,
            userId: user.uid,
        };
        await addTodo(todo);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
        toast({ title: "Todo created successfully", status: "success" });
    };
    const colSpan = useBreakpointValue({ base: 2, md: 1 });

    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Your Todos</Heading>
                <Text>Here you can view and add todos.</Text>
            </VStack>
            <Grid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={colSpan}>
                    <FormControl isRequired>
                        <FormLabel>Tile:</FormLabel>
                        <Input
                            placeholder="Complete weekly reading assignments"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                    <FormControl isRequired>
                        <FormLabel>Status:</FormLabel>
                        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option
                                value={"pending"}
                                style={{ color: "yellow", fontWeight: "bold" }}
                            >
                                Pending ⌛
                            </option>
                            <option
                                value={"completed"}
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                Completed ✅
                            </option>
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl isRequired>
                        <FormLabel>Description:</FormLabel>
                        <Textarea
                            placeholder="There are two required reading and doing activities this week:
                            W3Schools: SQL Tutorial https://www.w3schools.com/sql/ Links to an external site.
                            PHP vs. JavaScript: An In-Depth Comparison of the Two Scripting Languages
                            https://kinsta.com/blog/php-vs-javascript/Links to an external site. 
                            Note that we will only begin utilizing the PHP language starting next week."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button
                        onClick={() => handleTodoCreate()}
                        disabled={title.length < 1 || description.length < 1 || isLoading}
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
export default AddTodo;