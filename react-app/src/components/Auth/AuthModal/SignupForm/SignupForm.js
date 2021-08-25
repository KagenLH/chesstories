import { useSelector } from "react-redux";

import './SignupForm.css';

const SignupForm = () => {
    const phase = useSelector(state => state.modal.phase);

    if(phase !== 'signup') return null;

    return (
        <div>
            Signup Form
        </div>
    )
};

export default SignupForm;