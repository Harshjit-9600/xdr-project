import produce from "immer";
import {
  GET_SCRIPTS_API_SUCCESS,
  GET_SCRIPTS_API_FAILURE,
  GET_SCRIPT_METADATA_API_SUCCESS,
  GET_SCRIPT_METADATA_API_FAILURE,
  GET_SCRIPT_CODE_API_SUCCESS,
  GET_SCRIPT_CODE_API_FAILURE,
} from "./constants";

export const initialState = {
  getScripts: [],
  getScriptMetadata: null,
  getScriptCode: null,
  getScriptCodeFailure: null,
  getScriptsFailure: null,
  getScriptMetadataFailure: null,
  loading: false,
};

const getScriptsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_SCRIPTS_API_SUCCESS:
        draft.getScripts = action.data;
        draft.getScriptsFailure = null;
        break;
      case GET_SCRIPTS_API_FAILURE:
        draft.getScriptsFailure = action.data;
        draft.getScripts = [];
        break;
      case GET_SCRIPT_METADATA_API_SUCCESS:
        draft.getScriptMetadata = action.data;
        draft.getScriptMetadataFailure = null;
        break;
      case GET_SCRIPT_METADATA_API_FAILURE:
        draft.getScriptMetadataFailure = action.data;
        draft.getScriptMetadata = null;
        break;
      case GET_SCRIPT_CODE_API_SUCCESS:
        draft.getScriptCode = action.data;
        break;
      case GET_SCRIPT_CODE_API_FAILURE:
        draft.getScriptCodeFailure = action.data;
        break;
      default:
        break;
    }
  });
export default getScriptsReducer;
