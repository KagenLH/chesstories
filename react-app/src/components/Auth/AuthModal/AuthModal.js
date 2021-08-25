import { useDispatch, useSelector } from 'react-redux';

import EntryForm from './EntryForm';
import PasswordForm from './PasswordForm';
import SignupForm from './SignupForm';
import AuthLoader from '../../AuthLoader';

import { verifyCredential, hideModal } from '../../../store/modal';

import './AuthModal.css';

const AuthModal = () => {
    const dispatch = useDispatch();
    const show = useSelector(state => state.modal.show);
    if(!show) return null;

    return (
        <div className="auth-modal__container">
            <div className="auth-modal__content">
                <AuthLoader/>
                <div className="auth-modal__header">
                    <div className="auth-modal__header-content">
                        <button
                            className="auth-modal__close"
                            onClick={() => {
                                dispatch(hideModal());
                            }}
                        >
                            <span className="auth-modal__times-wrapper">
                                <i className="fas fa-times"></i>
                            </span>
                        </button>
                        <div
                            className="auth-modal__header-message"
                        >
                            Explore Curated Collections of Annotated Games
                        </div>
                    </div>
                </div>
                <div className="auth-modal__body">
                    <EntryForm/>
                    <PasswordForm/>
                    <SignupForm/>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;