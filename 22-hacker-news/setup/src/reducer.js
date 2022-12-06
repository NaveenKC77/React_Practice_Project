import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case SET_STORIES:
      return {
        ...state,
        stories: action.payload.hits,
        isLoading: false,
        nbHits: action.payload.nbHits,
        nbPages: action.payload.nbPages,
      };

    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      };

    case REMOVE_STORY:
      return {
        ...state,
        stories: state.stories.filter(
          (story) => story.objectID !== action.payload
        ),
      };
    case HANDLE_PAGE:
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }

        return {
          ...state,
          page: nextPage,
        };
      } else if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage <= 0) {
          prevPage = state.nbPages - 1;
        }

        return {
          ...state,
          page: prevPage,
        };
      }

    default:
      return { ...state };
  }
};
export default reducer;
