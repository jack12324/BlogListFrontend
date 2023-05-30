import { useState } from "react";
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

function SignupForm({ onClose, logInClicked }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
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

  const signup = async () => {
    if (validate()) {
      setPassword("");
      setUsername("");
      onClose();
    }
  };

  return (
    <ModalContent as="form">
      <ModalHeader>
        <Heading textAlign="center">Sign Up</Heading>
        <Text pt="2" fontWeight="normal" fontSize="md" textAlign="center">
          Already a user?
          <Button
            pl="1"
            colorScheme="green"
            variant="link"
            onClick={logInClicked}
          >
            Log in
          </Button>
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
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
        <Button colorScheme="green" bgColor="green.300" onClick={signup}>
          Sign Up
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

SignupForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  logInClicked: PropTypes.func.isRequired,
};

export default SignupForm;
