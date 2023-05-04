import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const mockHandleLike = jest.fn();
  const mockHandleDelete = jest.fn();
  const currentUser = {
    username: 'test_user',
  };
  const blog = {
    title: 'a test blog',
    author: 'jest',
    url: 'testing.com',
    likes: 0,
    user: {
      name: 'tester',
      username: 'test_user',
    },
  };

  beforeEach(() => {
    render(
      <Blog blog={blog} currentUser={currentUser} handleDelete={mockHandleDelete} handleLike={mockHandleLike} />,
    );
  });

  test('displays title and author but not url or likes by default', async () => {
    const title = await screen.getByText(blog.title, { exact: false });
    expect(title).toBeDefined();

    const author = await screen.getByText(blog.author, { exact: false });
    expect(author).toBeDefined();

    const url = await screen.queryByText(blog.url);
    expect(url).toBeNull();

    const likes = await screen.queryByText(blog.likes);
    expect(likes).toBeNull();
  });

  test('displays title and author url and likes when view button has been clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const title = await screen.getByText(blog.title, { exact: false });
    expect(title).toBeDefined();

    const author = await screen.getByText(blog.author, { exact: false });
    expect(author).toBeDefined();

    const url = await screen.queryByText(blog.url);
    expect(url).toBeDefined();

    const likes = await screen.queryByText(blog.likes);
    expect(likes).toBeDefined();
  });

  test('if like button is pressed twice, the event handler is called twice', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandleLike.mock.calls).toHaveLength(2);
  });
});
