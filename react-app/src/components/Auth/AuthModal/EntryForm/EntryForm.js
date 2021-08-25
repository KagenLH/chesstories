import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { setPhaseSignup, verifyCredential, hideModal, hideAuthLoader } from '../../../../store/modal';
import { login } from '../../../../store/session';

import './EntryForm.css';

const EntryForm = () => {
    const [credential, setCredential] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();

    const phase = useSelector(state => state.modal.phase);

    if(phase !== 'entry') return null;
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = await dispatch(verifyCredential(credential));
        if(errors) {
            setValidationErrors(errors);
            dispatch(hideAuthLoader());
        }
    };

    return (
        <div className="entry-form__container">
            <div className="entry-form__header">
                Welcome Back to ChesStories
            </div>
            <form
                className="entry-form"
                onSubmit={handleSubmit}
            >
                <div className="entry-form__credential">
                    <label className="entry-form__credential-label">E-mail or Username</label>
                    {validationErrors.length > 0 && 
                    <ul className="auth-validation-errors">
                        {validationErrors.map(error => (
                            <li key={error} className="auth-validation-error auth-error">{error}</li>
                        ))}
                    </ul>}
                    <div className="entry-form__credential-input-wrapper">
                        <input
                            id="entry-form__credential-input"
                            className="entry-form__credential-input"
                            maxLength={255}
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="entry-form__submit"
                >
                    Continue
                </button>
                <div className="entry-form__subtext">
                    <div className="entry-form__new-text">
                        First time on ChesStories?
                    </div>
                    <button
                        className="entry-form__new-button"
                        onClick={() => {
                            dispatch(setPhaseSignup());
                        }}
                    >
                        Create an account
                    </button>
                    <div className="entry-form__or-text">
                        Or
                    </div>
                    <button
                        className="entry-form__or-button"
                        onClick={() => {
                            dispatch(login('Demo', 'password'));
                            dispatch(hideModal());
                        }}
                    >
                        Login as the Demo User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EntryForm;