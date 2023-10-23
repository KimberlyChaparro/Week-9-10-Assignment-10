import { Container, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import AddEvent from "../components/AddEvent";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";
import ContactList from "../components/ContactList";

export default function Home() {
  return (
    <>
      <Auth />
      <Container maxW="7xl">
        <Tabs variant='soft-rounded' colorScheme='purple'>
          <TabList>
            <Tab>Todos</Tab>
            <Tab>Events</Tab>
            <Tab>Contacts</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AddTodo />
              <TodoList />
            </TabPanel>
            <TabPanel>
              <AddEvent />
              <EventList />
            </TabPanel>
            <TabPanel>
              <AddContact />
              <ContactList />
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Container>
    </>
  );
}