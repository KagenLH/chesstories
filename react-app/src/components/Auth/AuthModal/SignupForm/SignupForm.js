import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setPhaseEntry, showAuthLoader, hideAuthLoader, hideModal } from "../../../../store/modal";
import { login, signUp } from "../../../../store/session";

import '../EntryForm/EntryForm.css';
import './SignupForm.css';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const phase = useSelector(state => state.modal.phase);

    const dispatch = useDispatch();

    if(phase !== 'signup') return null;

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(showAuthLoader());

        if(password !== confirmPassword) {
            setValidationErrors(['Password and Confirm Password do not match.']);
            return;
        }

        const errors = await dispatch(signUp(username, email, password));

        if(errors?.length) {
            setValidationErrors(errors);
            dispatch(hideAuthLoader());
            return;
        } else {
            dispatch(hideModal());
            dispatch(hideAuthLoader());
        }
    } 

    return (
        <div className="signup-form__container">
            <div className="signup-form__header">
                Join the ChesStories Community.
            </div>
            <form
                className="signup-form"
                onSubmit={onSubmit}
            >
                <ul className="auth-validation-errors">
                    {validationErrors.map(error => (
                        <li key={error} className="auth-validation-error auth-error">{error.split(':')[1].trim()}</li>
                    ))}
                </ul>
                <div className="signup-form__field">
                    <label className="signup-form__label">
                        E-mail
                    </label>
                    <div className="signup-form__field-input-wrapper">
                        <input
                            className="signup-form__field-input"
                            type="text"
                            maxLength={255}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="signup-form__field">
                    <label className="signup-form__label">
                        Username
                    </label>
                    <div className="signup-form__field-input-wrapper">
                        <input
                            className="signup-form__field-input"
                            type="text"
                            maxLength={40}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="signup-form__field">
                    <label className="signup-form__label">
                        Password
                    </label>
                    <div className="signup-form__field-input-wrapper">
                        <input
                            className="signup-form__field-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="signup-form__field">
                    <label className="signup-form__label">
                        Confirm Password
                    </label>
                    <div className="signup-form__field-input-wrapper">
                        <input
                            className="signup-form__field-input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="signup-form__submit"
                >
                    Sign Up
                </button>
                <div className="entry-form__subtext">
                    <div className="entry-form__new-text">
                        Already have an account here?
                    </div>
                    <button
                        className="entry-form__new-button"
                        onClick={() => {
                            dispatch(setPhaseEntry());
                        }}
                    >
                        Login
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
    )
};

export default SignupForm;