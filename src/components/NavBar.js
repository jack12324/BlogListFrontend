import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Heading,
  Highlight,
  HStack,
} from "@chakra-ui/react";
import CurrentUser from "./CurrentUser";

function NavBar() {
  const user = useSelector((state) => state.currentUser);
  if (!user) return null;
  return (
    <HStack as="nav" spacing="10" justify="space-between" pt="2" pb="4">
      <Heading as="h1" textColor="gray.700" size="lg">
        <Highlight query="Up" styles={{ color: "green.300" }}>
          BlogUp
        </Highlight>
      </Heading>
      <HStack justify="space-between" spacing="8">
        <ButtonGroup colorScheme="gray" variant="link" spacing="8">
          <Button fontSize="lg">
            <Link to="/">Blogs</Link>
          </Button>
          <Button fontSize="lg">
            <Link to="/users">Users</Link>
          </Button>
        </ButtonGroup>
        <CurrentUser />
      </HStack>
    </HStack>
  );
}

export default NavBar;
