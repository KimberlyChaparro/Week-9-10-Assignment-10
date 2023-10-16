import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import AddEvent from "../components/AddEvent";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";
export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddTodo />
      <AddEvent />
      <TodoList />
      <EventList />
    </Container>
  );
}