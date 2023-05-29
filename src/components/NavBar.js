import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import CurrentUser from "./CurrentUser";
import Logo from "./Logo";

function NavBar() {
  const user = useSelector((state) => state.currentUser);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!user) return null;
  return (
    <>
      <HStack
        as="nav"
        spacing={{ base: "8", sm: "10" }}
        justify="space-between"
        pt="2"
        pb="2"
        borderBottomWidth="1px"
      >
        {isMobile ? (
          <>
            <IconButton
              aria-label="Open Menu"
              variant="ghost"
              icon={
                isOpen ? (
                  <CloseIcon boxSize="4" />
                ) : (
                  <HamburgerIcon boxSize="8" />
                )
              }
              onClick={isOpen ? onClose : onOpen}
            />
            <Logo />
            <CurrentUser />
          </>
        ) : (
          <>
            <Logo />
            <HStack justify="space-between" spacing="8">
              <NavBarLinks />
              <CurrentUser />
            </HStack>
          </>
        )}
      </HStack>

      {isOpen ? (
        <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px" pt="2" pb="2">
              <Logo />
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody>
              <NavBarLinks
                orientation="vertical"
                clickHandler={onClose}
                spacing="4"
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : null}
    </>
  );
}

function NavBarLinks({ orientation, clickHandler, spacing }) {
  return (
    <ButtonGroup
      colorScheme="gray"
      variant="link"
      spacing={spacing}
      orientation={orientation}
    >
      <Button fontSize="lg" onClick={clickHandler}>
        <Link to="/">Home</Link>
      </Button>
      <Button fontSize="lg" onClick={clickHandler}>
        <Link to="/myblogs">My Blogs</Link>
      </Button>
    </ButtonGroup>
  );
}

NavBarLinks.propTypes = {
  orientation: PropTypes.string,
  clickHandler: PropTypes.func,
  spacing: PropTypes.string,
};
NavBarLinks.defaultProps = {
  orientation: "horizontal",
  clickHandler: () => {},
  spacing: "8",
};

export default NavBar;
