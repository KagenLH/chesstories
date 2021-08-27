import { useHistory } from 'react-router';

import './CollectionCard.css';

const CollectionCard = ({ collection }) => {
    const history = useHistory();

    return (
        <div
            className="collection-card__container"
            onClick={() => history.push(`/collections/${collection.id}`)}
        >
            <div className="collection-card__content">
                <div
                    className="collection-card__preview"
                >
                    <img src={collection.preview_url} alt="\A" className="preview-image"/>
                </div>
                <div className="collection-card__header">
                    {collection.name}
                </div>
                <div className="collection-card__body">
                    {collection.description}
                </div>
            </div>
        </div>
    )
};

export default CollectionCard;