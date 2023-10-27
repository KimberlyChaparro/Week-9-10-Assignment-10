import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaTrash } from "react-icons/fa";
import { deleteEvent } from "../api/event";

const EventList = () => {
    const [events, setEvents] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
        if (!user) {
            setEvents([]);
            return;
        }
        const q = query(collection(db, "event"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setEvents(ar);
        });
    };
    useEffect(() => {
        refreshData();
    }, [user]);
    const handleEventDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this event?")) {
            deleteEvent(id);
            toast({ title: "Event deleted successfully", status: "success" });
        }
    };

    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                {events &&
                    events.map((event) => (
                        <Box
                            key={event.id}
                            p={8}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                        >
                            <Heading color="#5D3FD3" as="h3" fontSize={"xl"}>
                                <a href={"/event/" + event.id}>
                                    {event.eventName}{" "}
                                </a>
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleEventDelete(event.id)}
                                >
                                    <FaTrash />
                                </Badge>

                            </Heading>
                            <Text color="#C3B1E1">{event.date}</Text>
                            <Text color="#C3B1E1">{event.details}</Text>
                        </Box>
                    ))
                }
            </SimpleGrid >
        </Box >
    );
};
export default EventList;
