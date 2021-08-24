const SHOW_MODAL = 'modal/SHOW_MODAL';
const HIDE_MODAL = 'modal/HIDE_MODAL';

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

const initialState = {
    show: false,
};

const modalReducer = (state=initialState, action) => {
    switch(action.type) {
        case SHOW_MODAL:
            return { show: true };
        case HIDE_MODAL:
            return { show: false };
        default:
            return state;
    }
};

export default modalReducer;