import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPhaseEntry } from '../../../../store/modal';

import '../EntryForm/EntryForm.css';

const PasswordForm = () => {
    const [password, setPassword] = useState("");

    const phase = useSelector(state => state.modal.phase);
    const credential = useSelector(state => state.modal.credential);

    const dispatch = useDispatch();

    if(phase !== 'login') return null;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="entry-form__container">
        <div className="entry-form__header">
            {`Welcome Back, ${credential}`}
        </div>
        <form
            className="entry-form"
            onSubmit={handleSubmit}
        >
            <div className="entry-form__credential">
                <label className="entry-form__credential-label">Password</label>
                <div className="entry-form__credential-input-wrapper">
                    <input
                        id="entry-form__credential-input"
                        type="password"
                        className="entry-form__credential-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button
                className="entry-form__submit"
            >
                Login
            </button>
            <div className="entry-form__subtext">
                <div className="entry-form__not-you-text">
                    {`${credential} not you?`}
                </div>
                <button
                    className="entry-form__not-you-button"
                    onClick={() => {
                        dispatch(setPhaseEntry());
                    }}
                >
                    Login with a different user
                </button>
            </div>
        </form>
    </div>
    )
};

export default PasswordForm;