import { Redirect } from 'react-router';

const SET_COLLECTIONS = 'collections/SET_COLLECTIONS';
const ADD_COLLECTION = 'collections/ADD_COLLECTION';
const UPDATE_COLLECTION = 'collections/UPDATE_COLLECTION';

const setCollections = (collections) => {
    return {
        type: SET_COLLECTIONS,
        payload: collections,
    };
};

const addCollection = (collection) => {
    return {
        type: ADD_COLLECTION,
        payload: collection,
    };
};

const updateCollection = (collection) => {
    return {
        type: UPDATE_COLLECTION,
        payload: collection,
    };
};

export const loadCollections = () => async (dispatch) => {
    const res = await fetch('/api/collections/');

    if(res.ok) {
        const data = await res.json();
        dispatch(setCollections(data.collections));
        return null;
    } else {
        return (
            <Redirect to="/error"/>
        )
    }
};

export const createCollection = (name, description, previewImage) => async (dispatch) => {
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('preview_image', previewImage)

    const res = await fetch('/api/collections/', {
        method: 'POST',
        body: form,
    });

    if(res.ok) {
        const collection = await res.json();
        dispatch(addCollection(collection));
        return null;
    } else if(res.status < 500) {
        const errors = await res.json();
        return errors;
    } else {
        return (
            <Redirect to="/error"/>
        )
    }
};

export const uploadBanner = (bannerImage, id) => async (dispatch) => {
    const form = new FormData();
    form.append('banner_image', bannerImage);

    const res = await fetch(`/api/collections/${id}/banner`, {
        method: 'PATCH',
        body: form,
    });

    if(res.ok) {
        const collection = await res.json();
        dispatch(updateCollection(collection));
        return null;
    } else if(res.status < 500) {
        const errors = await res.json();
        return errors;
    } else {
        return (
            <Redirect to="/error"/>
        )
    }
}

const initialState = [];

const collectionsReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_COLLECTIONS:
            return [ ...action.payload ];
        case ADD_COLLECTION:
            return [ ...state, action.payload ];
        case UPDATE_COLLECTION: {
            const newState = { ...state };
            const collectionToUpdate = state.findIndex(collection => collection.id === action.payload.id);
            newState[collectionToUpdate] = action.payload;
            return newState;
        }
        default:
            return state;
    }
};

export default collectionsReducer;