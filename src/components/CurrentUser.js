import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Text, useBreakpointValue } from "@chakra-ui/react";
import { logout } from "../reducer/currentUserReducer";

function CurrentUser() {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return null;
  return (
    <HStack justify="space-between" spacing="4" fontSize="lg">
      {isMobile ? null : (
        <Text colorScheme="gray" color="gray.800" fontWeight="semibold">
          Welcome {user.name}!
        </Text>
      )}
      <Button
        variant="outline"
        colorScheme="gray"
        fontSize="lg"
        onClick={onLogout}
      >
        Log Out
      </Button>
    </HStack>
  );
}

export default CurrentUser;
