import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogsHeading from "./BlogsHeading";

function Blogs() {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogFormRef = useRef();
  const isBase = useBreakpointValue({ base: true, sm: false });
  const [liked, setLiked] = useState(false);

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };
  return (
    <section>
      {isBase ? null : <BlogsHeading />}
      <Togglable key="newBlogToggle" buttonLabel="Add a blog" ref={blogFormRef}>
        <BlogForm toggle={toggleBlogForm} />
      </Togglable>
      <SimpleGrid
        minChildWidth="300px"
        spacingX="15px"
        spacingY={{ base: "50px", md: "20px" }}
      >
        {blogs.map((blog) => (
          <Center key={blog.id} height="300px">
            <Box
              h="300px"
              w="300px"
              rounded="md"
              overflow="hidden"
              border="1px"
              borderColor="grey"
            >
              <Box h="66%" borderBottom="1px" borderColor="grey">
                test
              </Box>
              <Box h="19%" borderBottom="1px">
                <Heading
                  color="grey.800"
                  noOfLines={1}
                  fontSize="lg"
                  px="1"
                  pt="1"
                >
                  {blog.title}
                </Heading>
                <Text px="2" color="green.300" noOfLines={1} align="right">
                  {blog.author}
                </Text>
              </Box>
              <HStack h="15%" alignItems="center" px="1">
                <Text
                  px="1"
                  noOfLines={1}
                  w="75%"
                  borderRight="1px"
                >{`Added by ${blog.user.name}`}</Text>
                <HStack w="25%" align="right" justify="space-between" px="1">
                  <Flex onClick={() => setLiked(!liked)} align="center" pl="2">
                    {liked ? (
                      <BsHeartFill fill="red" fontSize="22px" bord />
                    ) : (
                      <BsHeart fontSize="22px" />
                    )}
                  </Flex>
                  <Text>{blog.likes}</Text>
                </HStack>
              </HStack>
            </Box>
          </Center>
        ))}
      </SimpleGrid>
    </section>
  );
}

export default Blogs;
