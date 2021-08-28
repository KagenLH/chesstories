const SHOW_LOADER = 'loader/SHOW_LOADER';
const HIDE_LOADER = 'loader/HIDE_LOADER';

export const showLoader = () => {
    return {
        type: SHOW_LOADER,
    };
};

export const hideLoader = () => {
    return {
        type: HIDE_LOADER,
    };
};

const initialState = {
    show: false,
};

const loaderReducer = (state=initialState, action) => {
    switch(action.type) {
        case SHOW_LOADER:
            return { show: true };
        case HIDE_LOADER:
            return { show: false };
        default:
            return state;
    }
};

export default loaderReducer;