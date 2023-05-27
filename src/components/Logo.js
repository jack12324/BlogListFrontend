import { Heading, Highlight } from "@chakra-ui/react";

function Logo() {
  return (
    <Heading as="h1" textColor="gray.800" size="lg">
      <Highlight query="Up" styles={{ color: "green.300" }}>
        BlogUp
      </Highlight>
    </Heading>
  );
}
export default Logo;
