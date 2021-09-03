import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import chessLogo from '../../../assets/images/chess-logo.png';
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
            {/* <img src={chessLogo} alt="\A" className="splash-logo"/> */}
            <div className="splash-message">
                Explore Curated Collections of Carefully Annotated Chess Games.
            </div>
            <div className="splash-message-2">
            Re-live The Most Famous Moments in Chess History With Personal Commentary and A Modern Interface.
            </div>
            <div className="splash-footer">
                Created by Kagen Hearn with React/Redux and Flask
                <a className="github-container" href="https://github.com/KagenLH"><i className="fab fa-github"></i></a>
                <a className="linkedin-container" href="https://www.linkedin.com/in/kagen-hearn-228b96130/"><i className="fab fa-linkedin"></i></a>
            </div>
        </div>
    )
};

export default SplashPage;