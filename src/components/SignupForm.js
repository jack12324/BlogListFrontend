import {
  Button,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useRequiredField } from "../hooks";
import RequiredFormTextControl from "./RequiredFormTextControl";
import RequiredFormPasswordControl from "./RequiredFormPasswordControl";

function SignupForm({ onClose, logInClicked }) {
  const username = useRequiredField("text", "username");
  const password = useRequiredField("text", "password");
  const validate = () => {
    let result = username.validate();
    result = password.validate() && result;
    return result;
  };

  const signup = async () => {
    if (validate()) {
      password.reset();
      username.reset();
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
        <RequiredFormTextControl field={username} name="username" />
        <RequiredFormPasswordControl field={password} />
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
