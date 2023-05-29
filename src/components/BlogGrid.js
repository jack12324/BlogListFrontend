import { Box, SimpleGrid } from "@chakra-ui/react";
import PropTypes from "prop-types";
import BlogCard from "./BlogCard";

function BlogGrid({ blogs }) {
  return (
    <Box as="section" py="4">
      <SimpleGrid
        minChildWidth="300px"
        spacingX="15px"
        spacingY={{ base: "50px", md: "20px" }}
      >
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

BlogGrid.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default BlogGrid;
