const SHOW_MODAL = 'modal/SHOW_MODAL';
const HIDE_MODAL = 'modal/HIDE_MODAL';
const SHOW_LOADER = 'modal/SHOW_LOADER';
const HIDE_LOADER = 'modal/HIDE_LOADER';
const SET_PHASE_ENTRY = 'modal/SET_PHASE_ENTRY';
const SET_PHASE_SIGNUP = 'modal/SET_PHASE_SIGNUP';
const SET_PHASE_LOGIN = 'modal/SET_PHASE_LOGIN';

export const showModal = () => {
    return {
        type: SHOW_MODAL,
    };
};

export const hideModal = () => {
    return {
        type: HIDE_MODAL,
    };
};

export const showAuthLoader = () => {
    return {
        type: SHOW_LOADER,
    };
};

export const hideAuthLoader = () => {
    return {
        type: HIDE_LOADER,
    };
};

export const setPhaseEntry = () => {
    return {
        type: SET_PHASE_ENTRY,
    };
};

export const setPhaseSignup = () => {
    return {
        type: SET_PHASE_SIGNUP,
    };
};

const setPhaseLogin = (credential) => {
    return {
        type: SET_PHASE_LOGIN,
        payload: credential,
    };
};

export const verifyCredential = (credential) => async (dispatch) => {
    const res = await fetch('/api/auth/credential', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential),
    });

    if(res.ok) {
        const data = await res.json();

        if(data.errors) {
            return data.errors;
        }

        dispatch(setPhaseLogin(data.username));
        dispatch(hideAuthLoader());
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
};

const initialState = {
    show: false,
    phase: 'entry',
    credential: null,
    loader: false,
};

const modalReducer = (state=initialState, action) => {
    switch(action.type) {
        case SHOW_MODAL:
            return { ...state, show: true };
        case HIDE_MODAL:
            return { ...state, show: false };
        case SET_PHASE_ENTRY:
            return { ...state, phase: 'entry' };
        case SET_PHASE_SIGNUP:
            return { ...state, phase: 'signup' };
        case SET_PHASE_LOGIN:
            return { ...state, phase: 'login', credential: action.payload };
        case SHOW_LOADER:
            return { ...state, loader: true };
        case HIDE_LOADER:
            return { ...state, loader: false };
        default:
            return state;
    }
};

export default modalReducer;