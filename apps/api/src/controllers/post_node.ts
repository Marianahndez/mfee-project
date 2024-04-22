// Initialize posts array to save data in memory
const posts = [];

export const getPost = (id: string) => {
  return posts.find((p) => p.id === id);
};

// Get all categories
const getPosts = (req, res) => {
  // Return all the posts with a 200 status code
  res.status(200).json(posts);
};

// Get post by category
const getPostsByCategory = (req, res) => {
  // Retrieve the id from the route params
  const { category } = req.params;
  // Check if we have a category with that id
  const post = posts.find((p) => p.category === category);

  if (!post) {
    // If we don't find the post return a 404 status code with a message
    return res.status(404).json({ message: 'Category not found' });
    // Note: Remember that json method doesn't interrupt the workflow
    // therefore is important to add a "return" to break the process
  }

  // Return the post with a 200 status code
  res.status(200).json(post);
};

// Create post
const createPost = (req, res) => {
  // Retrieve the name from the request body
  const { name } = req.body;

  if (!name) {
    // If name is empty or undefined return a 400 status code with a message
    return res.status(400).json({ message: 'The name is required.' });
  }

  // Generate a new category
  const newPost = {
    id: Date.now().toString(), // Convert id to string to match the value in get by id endpoint
    name
  };
  // Add the new post to our array
  posts.push(newPost);

  // Return the created category with a 201 status code
  res.status(201).json(newPost);
};

// Create comment
const createComment = (req, res) => {
  // Retrieve the id for the post we want to comment
  const { id, comment } = req.body;
  const postFound = posts.find((p) => p.id === id);

  if (!id) {
    // If name is empty or undefined return a 400 status code with a message
    return res.status(400).json({ message: 'The name is required.' });
  }

  // Generate a new category
  const postComment = {
    ...postFound,
    comment
  };
  // Add the new post to our array
  posts.push(postComment);

  // Return the created category with a 201 status code
  res.status(201).json(postComment);
};

// Update post -- review this in an example --
const updatePost = (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  // Retrieve the index of the post in the array
  const postIndex = posts.findIndex((p) => p.id === id);

  // "findIndex" will return -1 if there is no match
  if (postIndex === -1) {
    // If we don't find the category return a 404 status code with a message
    return res.status(404).json({ message: 'Post not found' });
  }

  // Generate a copy of our post
  const updatedPost = { ...posts[postIndex] };

  // Update the post in our array
  posts[postIndex] = updatedPost;

  // Return the updated post with a 200 status code
  res.status(200).json(updatedPost);
};

// Delete post
const deletePost = (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  // Retrieve the index of the post in the array
  const postIndex = posts.findIndex((p) => p.id === id);

  // "findIndex" will return -1 if there is no match
  if (postIndex === -1) {
    // If we don't find the post return a 404 status code with a message
    return res.status(404).json({ message: 'Post not found' });
  }

  // Remove the post from the array
  posts.splice(postIndex, 1);

  // Return a 204 status code
  res.status(204).send();
};

export default {
  getPosts,
  getPostsByCategory,
  getPost,
  createPost,
  createComment,
  updatePost,
  deletePost
};
