import produce from "immer";

export const initialState = {
  imagePaths: [],
  mainPosts: [],
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "UPLOAD_IMAGES_REQUEST":
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case "UPLOAD_IMAGES_SUCCESS": {
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case "UPLOAD_IMAGES_FAILURE":
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case "ADD_POST_REQUEST":
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case "ADD_POST_SUCCESS":
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.imagePaths = [];
        break;
      case "ADD_POST_FAILURE":
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case "LOAD_POSTS_REQUEST":
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case "LOAD_POSTS_SUCCESS":
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        break;
      case "LOAD_POSTS_FAILURE":
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
