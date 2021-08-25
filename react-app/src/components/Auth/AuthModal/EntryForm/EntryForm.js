import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { setPhaseSignup, setPhaseLogin, verifyCredential, showAuthLoader, hideAuthLoader } from '../../../../store/modal';

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
                    <div className="entry-form__credential-input-wrapper">
                        <input
                            id="entry-form__credential-input"
                            className="entry-form__credential-input"
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
                            dispatch(showAuthLoader());
                            setTimeout(() => {
                                dispatch(hideAuthLoader())
                            }, 5000);
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