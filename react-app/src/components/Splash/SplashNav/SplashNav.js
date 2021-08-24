import './SplashNav.css';

const SplashNav = () => {
    return (
        <div className="splash-nav">
            <div className="splash-nav__auth">
                <div className="splash-nav__login">
                    <button className="splash-nav__auth-button">
                        Login
                    </button>
                </div>
                <div className="splash-nav__signup">
                    <button className="splash-nav__auth-button">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
};

export default SplashNav;