import { Redirect } from 'react-router';

const SET_COLLECTIONS = 'collections/SET_COLLECTIONS';

const setCollections = (collections) => {
    return {
        type: SET_COLLECTIONS,
        payload: collections,
    };
};

export const loadCollections = () => async (dispatch) => {
    const res = await fetch('/api/collections/');

    if(res.ok) {
        const data = await res.json();
        console.log(data.collections);
        dispatch(setCollections(data.collections));
        return null;
    } else {
        return (
            <Redirect to="/error"/>
        )
    }
};

const initialState = [];

const collectionsReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_COLLECTIONS:
            return [ ...action.payload ];
        default:
            return state;
    }
};

export default collectionsReducer;