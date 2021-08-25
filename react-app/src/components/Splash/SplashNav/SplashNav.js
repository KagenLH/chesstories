import { useSelector, useDispatch } from 'react-redux';

import { setPhaseEntry, setPhaseLogin, setPhaseSignup, showModal } from '../../../store/modal';

import './SplashNav.css';

const SplashNav = () => {
    const credential = useSelector(state => state.modal.credential);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    if(user) {
        return null;
    }
    
    return (
        <div className="splash-nav">
            <div className="splash-nav__auth">
                <div className="splash-nav__login">
                    <button
                        className="splash-nav__auth-button"
                        onClick={() => {
                            if(credential) {
                                dispatch(setPhaseLogin(credential));
                            } else {
                                dispatch(setPhaseEntry());
                            }
                            dispatch(showModal());
                        }}
                    >
                        Login
                    </button>
                </div>
                <div className="splash-nav__signup">
                    <button
                        className="splash-nav__auth-button"
                        onClick={() => {
                            dispatch(setPhaseSignup());
                            dispatch(showModal());
                        }}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
};

export default SplashNav;