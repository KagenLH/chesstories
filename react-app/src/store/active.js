import { Redirect } from "react-router";

const SET_ACTIVE_COLLECTION = 'active/SET_ACTIVE_COLLECTION';

const setActiveCollection = (collection) => {
    return {
        type: SET_ACTIVE_COLLECTION,
        payload: collection,
    }
};

export const fetchCollection = (id) => async (dispatch) => {
    const res = await fetch(`/api/collections/${id}`);

    if(res.ok) {
        const collection = await res.json();
        dispatch(setActiveCollection(collection));
    } else {
        return (
            <Redirect to="/error"/>
        )
    }
};

const initialState = {
    collection: null,
}

const activeReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_ACTIVE_COLLECTION:
            return { ...state, collection: action.payload };
        default:
            return state;
    }
};

export default activeReducer;