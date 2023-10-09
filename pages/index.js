import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import AddInspoQuote from "../components/AddInspoQuote";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import InspoList from "../components/InspoList";
export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddTodo />
      <AddInspoQuote />
      <TodoList />
      <InspoList />
    </Container>
  );
}