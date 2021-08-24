import { useDispatch, useSelector } from 'react-redux';

import { verifyCredential, hideModal } from '../../../store/modal';

import './AuthModal.css';

const AuthModal = () => {
    const dispatch = useDispatch();
    const show = useSelector(state => state.modal.show);
    console.log(show);
    if(!show) return null;

    return (
        <div className="auth-modal__container">
            <div className="auth-modal__content">
                <div className="auth-modal__header">
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
                </div>
            </div>
        </div>
    );
};

export default AuthModal;