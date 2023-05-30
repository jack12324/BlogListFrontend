import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { loginUser } from "../reducer/currentUserReducer";
import ErrorAlert from "./ErrorAlert";

function LoginForm({ onClose, signupClicked }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [error, setError] = useState("");
  const validate = () => {
    let fail = false;
    if (username === "") {
      setInvalidUsername("Username is required");
      fail = true;
    } else {
      setInvalidUsername("");
    }
    if (password === "") {
      setInvalidPassword("Password is required");
      fail = true;
    } else {
      setInvalidPassword("");
    }
    return !fail;
  };

  const dispatch = useDispatch();

  const login = async () => {
    if (validate()) {
      const loginError = await dispatch(
        loginUser({
          username,
          password,
        })
      );
      if (!loginError) {
        setPassword("");
        setUsername("");
        onClose();
      } else {
        setError(loginError);
      }
    }
  };

  return (
    <ModalContent as="form">
      <ModalHeader>
        <Heading textAlign="center">Log In</Heading>
        <Text pt="2" fontWeight="normal" fontSize="md" textAlign="center">
          New here?
          <Button
            pl="1"
            colorScheme="green"
            variant="link"
            onClick={signupClicked}
          >
            Sign up
          </Button>
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {error && <ErrorAlert msg={error} />}
        <FormControl id="username" isRequired isInvalid={invalidUsername}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <FormErrorMessage>{invalidUsername}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isRequired isInvalid={invalidPassword}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{invalidPassword}</FormErrorMessage>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="green" bgColor="green.300" onClick={login}>
          Log In
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  signupClicked: PropTypes.func.isRequired,
};

export default LoginForm;
