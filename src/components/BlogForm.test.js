import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm/> calls the event handler passed into it with the correct values', async () => {
  const mockAddBlog = jest.fn();
  const { container } = render(
    <BlogForm addBlog={mockAddBlog} />,
  );

  const user = userEvent.setup();

  const titleInput = container.querySelector('#title');
  const authorInput = container.querySelector('#author');
  const urlInput = container.querySelector('#url');

  const submit = screen.getByText('create');

  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test.com',
  };

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);

  await user.click(submit);

  expect(mockAddBlog.mock.calls).toHaveLength(1);
  expect(mockAddBlog.mock.calls[0][0]).toEqual(blog);
});
