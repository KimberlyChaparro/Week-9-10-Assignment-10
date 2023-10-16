import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import AddEvent from "../components/AddEvent";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";
import ContactList from "../components/ContactList";
export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddTodo />
      <AddEvent />
      <AddContact />
      <TodoList />
      <EventList />
      <ContactList />
    </Container>
  );
}