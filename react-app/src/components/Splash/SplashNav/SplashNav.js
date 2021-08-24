import { useDispatch } from 'react-redux';

import { setPhaseEntry, setPhaseSignup, showModal } from '../../../store/modal';

import './SplashNav.css';

const SplashNav = () => {
    const dispatch = useDispatch();

    return (
        <div className="splash-nav">
            <div className="splash-nav__auth">
                <div className="splash-nav__login">
                    <button
                        className="splash-nav__auth-button"
                        onClick={() => {
                            dispatch(setPhaseEntry());
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