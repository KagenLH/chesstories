import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import './SplashPage.css';

const SplashPage = () => {
    const user = useSelector(state => state.session.user);

    if(user) {
        return (
            <Redirect to="/collections"/>
        )
    }
    return (
        <div className="splash-container">

        </div>
    )
};

export default SplashPage;