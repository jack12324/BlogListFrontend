import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Text } from "@chakra-ui/react";
import { logout } from "../reducer/currentUserReducer";

function CurrentUser() {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return null;
  return (
    <HStack justify="space-between" spacing="4" fontSize="lg">
      <Text colorScheme="gray" color="gray.700" fontWeight="semibold">
        Welcome {user.name}!
      </Text>
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
