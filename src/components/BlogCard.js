import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteBlog, likeBlog, unLikeBlog } from "../reducer/blogReducer";
import { errorToast } from "./Toasts";
import DeleteAlert from "./DeleteAlert";

function BlogCard({ blog }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUser = useSelector((state) =>
    state.users.find((u) => u.username === state.currentUser?.username)
  );

  const userLikesBlog = (user) => {
    if (blog && user) {
      return blog.usersWhoLike.find((u) => u.username === user.username);
    }
    return false;
  };

  const isUsersBlog = () => {
    if (blog && currentUser) {
      return blog.user.username === currentUser.username;
    }
    return false;
  };

  const handleLikeClick = async () => {
    if (!currentUser) {
      errorToast("You must log in to like a blog");
      return;
    }
    if (userLikesBlog(currentUser, blog)) {
      await dispatch(unLikeBlog(blog, currentUser));
    } else {
      await dispatch(likeBlog(blog, currentUser));
    }
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog));
  };

  return (
    <>
      {isOpen && (
        <DeleteAlert
          onClose={onClose}
          isOpen={isOpen}
          deleteConfirmed={handleDelete}
        />
      )}
      <Center height="300px">
        <Box
          h="300px"
          w="300px"
          rounded="md"
          overflow="hidden"
          border="1px"
          borderColor="grey"
        >
          <LinkBox h="85%">
            <Box h="78%" borderBottom="1px" borderColor="grey">
              <Image
                src={`https://picsum.photos/seed/${blog.id}/300/200`}
                alt="A placeholder image"
              />
            </Box>
            <Box borderBottom="1px">
              <Heading
                color="grey.800"
                noOfLines={1}
                fontSize="lg"
                px="1"
                pt="1"
              >
                {blog.title}
              </Heading>
              <Text pb="1" px="2" color="green.300" noOfLines={1} align="right">
                {blog.author}
              </Text>
            </Box>
            <LinkOverlay href={blog.url} />
          </LinkBox>
          <HStack h="15%" alignItems="center" px="1" justify="space-between">
            <Text px="1" noOfLines={1}>{`Added by ${blog.user.name}`}</Text>
            <HStack align="right" justify="space-between" px="1">
              <Box borderRight="1px" />
              {isUsersBlog() ? (
                <>
                  <Center>
                    <DeleteIcon as="button" cursor="pointer" onClick={onOpen} />
                  </Center>
                  <Box borderLeft="1px" />
                </>
              ) : null}
              <HStack justify="space-between">
                <Flex onClick={() => handleLikeClick(blog)} align="center">
                  {userLikesBlog(currentUser, blog) ? (
                    <BsHeartFill
                      fill="hotpink"
                      fontSize="22px"
                      cursor="pointer"
                    />
                  ) : (
                    <BsHeart fontSize="22px" cursor="pointer" />
                  )}
                </Flex>
                <Text>{blog.likes}</Text>
              </HStack>
            </HStack>
          </HStack>
        </Box>
      </Center>
    </>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
    }),
    likes: PropTypes.number,
    usersWhoLike: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default BlogCard;
