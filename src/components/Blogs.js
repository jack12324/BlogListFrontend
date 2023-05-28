import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogsHeading from "./BlogsHeading";
import { likeBlog, unLikeBlog } from "../reducer/blogReducer";

function Blogs() {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );

  const currentUser = useSelector((state) =>
    state.users.find((u) => u.username === state.currentUser.username)
  );

  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const isBase = useBreakpointValue({ base: true, sm: false });

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  const userLikesBlog = (user, blog) => {
    if (blog && user) {
      return blog.usersWhoLike.find((u) => u.username === user.username);
    }
    return false;
  };

  const handleLikeClick = async (blog) => {
    if (userLikesBlog(currentUser, blog)) {
      await dispatch(unLikeBlog(blog, currentUser));
    } else {
      await dispatch(likeBlog(blog, currentUser));
    }
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
                <Image
                  src={`https://picsum.photos/seed/${blog.id}/300/200`}
                  alt="A placeholder image"
                />
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
                  <Flex
                    onClick={() => handleLikeClick(blog)}
                    align="center"
                    pl="2"
                  >
                    {userLikesBlog(currentUser, blog) ? (
                      <BsHeartFill fill="red" fontSize="22px" />
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
