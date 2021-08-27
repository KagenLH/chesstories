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

