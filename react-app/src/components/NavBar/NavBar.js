import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/session';

import './NavBar.css';

const NavBar = () => {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    if(!user) return null;

    const handleSubmit = async () => {
        await dispatch(logout());
    };

    return (
        <div className="navigation">
            <div className="navigation-links">
                <NavLink
                    to="/collections"
                    className="navigation-link"
                >
                    Collections
                </NavLink>
                <span
                    className="navigation-link"
                    onClick={handleSubmit}
                >
                    Logout
                </span>
            </div>
        </div>
    );
}

export default NavBar;