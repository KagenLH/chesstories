import { useSelector } from 'react-redux';

import './Loader.css';
import '../AuthLoader/AuthLoader.css';

const Loader = () => {
    const show = useSelector(state => state.loader.show);

    if(!show) return null;

    return (
        <div className="loader-container">
            <div className="auth-loader-display">
                <div className="loader-knight loader-piece"><i className="fas fa-chess-knight"></i></div>
                <div className="loader-pawn loader-piece"><i className="fas fa-chess-pawn"></i></div>
                <div className="loader-rook loader-piece"><i className="fas fa-chess-rook"></i></div>
                <div className="loader-king loader-piece"><i className="fas fa-chess-king"></i></div>
            </div>
        </div>
    );
};

export default Loader;