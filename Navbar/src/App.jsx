import MyNav from "./components/Navbar/MyNav";
import Navigation from "./components/Navbar/Navigation";
import { Flex, Text, Button } from "@radix-ui/themes";
import { useNavbarContext } from "./context/NavbarContext";

function App() {
  const { closeSubmenu } = useNavbarContext();
  return (
    <>
      <MyNav>
        <Navigation />
        <main onMouseOver={closeSubmenu}>
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
