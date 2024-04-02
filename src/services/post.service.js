import axios from "axios";

class PostsService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      // We set our API's base URL so that all requests use the same base URL
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  addPost = ({ title, content, thumbnailImageUrl, coverImageUrl }) => {
    return this.api.post("/posts", {
      title,
      content,
      thumbnailImageUrl, 
      coverImageUrl,
    });
  };

  getAllPosts = () => {
    return this.api.get('/posts');
  };

  getPostDetails = (postId) => {
    return this.api.get(`/posts/${postId}`);
  };

  editPostDetails = (
    postId,
    { title, content }
  ) => {
    return this.api.put(`/posts/${postId}`, {
      title,
      content,
    });
  };

  deletePost = (postId) => {
    return this.api.delete(`/posts/${postId}`);
  };

//   addCakeReview = ({
//     author,
//     cake,
//     comment,
//     rating
//   }) => {
//     return this.api.post(`/cakes/${cake}/comment`, {
//       author,
//       cake,
//       comment,
//       rating
//     });
//   };
}

// Create one instance object
const postsService = new PostsService();

export default postsService;
