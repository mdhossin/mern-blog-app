import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
} from "../constants/userConstants";

// user login action
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGIN_RESET:
      return {};

    default:
      return state;
  }
};

// user register action
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};

export const userLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        userLogout: action.payload,
      };

    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT_RESET:
      return {};

    default:
      return state;
  }
};
export const fortgotPaswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        forgotPassword: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_RESET:
      return {};

    default:
      return state;
  }
};
export const resetPaswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        resetPassword: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_RESET:
      return {};

    default:
      return state;
  }
};
