import MyNav from "./components/Navbar/MyNav";
import Navigation from "./components/Navbar/Navigation";
import { Flex, Text, Button } from "@radix-ui/themes";

function App() {
  return (
    <>
      <MyNav>
        <Navigation />
        <main>
          <Flex direction="column" gap="2">
            <Text>Hello from Radix Themes :)</Text>
            <Button>Let's go</Button>
          </Flex>
        </main>
      </MyNav>
    </>
  );
}

export default App;
