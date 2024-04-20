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
    { title, content, thumbnailImageUrl, coverImageUrl }
  ) => {
    return this.api.put(`/posts/${postId}`, {
      title,
      content,
      thumbnailImageUrl, 
      coverImageUrl,
    });
  };

  deletePost = (postId) => {
    return this.api.delete(`/posts/${postId}`);
  };

  deleteComment = (commentId) => {
    return this.api.delete(`/posts/comments/${commentId}`);
  };
  addPostComment = ({
    postId,
    comment,
  }) => {
    return this.api.post(`/posts/${postId}/comment`, {
      comment,
    });
  };

  updateComment = (commentId, comment) => {
    return this.api.put(`/posts/comments/${commentId}`, { comment });
  };

  addLikeStatusToPost = ({
    postId,
    hasLiked,
  }) => {
    return this.api.post(`/posts/${postId}/like`, {
      hasLiked,
    });
  };
}

// Create one instance object
const postsService = new PostsService();

export default postsService;
