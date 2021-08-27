import CollectionForm from '../CollectionForm';

import './CreateCollection.css';

const CreateCollection = () => {
    return (
        <div className="create-collection-container">
            <div className="create-collection-content">
                <div className="create-collection-header">
                    Create A New Collection
                </div>
                <CollectionForm/>
            </div>
        </div>
    );
};

export default CreateCollection;