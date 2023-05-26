import { Center, Heading, Highlight } from "@chakra-ui/react";

function BlogsHeading() {
  return (
    <Center pt="4" pb="4">
      <Heading as="h1" size="2xl">
        <Highlight query="Enrich" styles={{ color: "green.300" }}>
          Blogs to Enrich Your Life
        </Highlight>
      </Heading>
    </Center>
  );
}
export default BlogsHeading;
