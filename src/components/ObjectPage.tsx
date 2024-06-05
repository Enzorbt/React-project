import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ObjectModel from '../models/ObjectModel';
import ObjectType from '../types/ObjectType';
import {useFlashes} from "../providers/FlashesProvider.tsx";

interface ObjectPageProps {
    objectModel: ObjectModel;
}

const ObjectPage: React.FC<ObjectPageProps> = ({ objectModel }) => {
    const { objectId } = useParams<{ objectId: string }>();
    const [objectData, setObjectData] = useState<ObjectType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { setFlashMessage } = useFlashes();
    const navigate = useNavigate();

    const goBackOrHome = () => {
        // Attempt to go back; if at root, navigate to home ("/")
        window.history.length > 1 ? navigate(-1) : navigate("/");
    };

    useEffect(() => {
        const fetchObject = () => {
            if (typeof objectId === "string") {
                objectModel.getObject(parseInt(objectId, 10))
                    .then(object => {
                        setObjectData(object);
                        setLoading(false);
                    })
                    .catch(err => {
                        setFlashMessage({
                            message: "Failed to fetch object, " + err,
                            type: "error",
                        });
                        setLoading(false);
                    });
            }
        };

        fetchObject();
    }, [objectId, objectModel, setFlashMessage]);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="text-white p-4">
                {objectData && (
                    <>
                        <h1 className="text-3xl font-bold mb-4">{objectData.title}</h1>
                        <img src={objectData.primaryImage} alt={objectData.title}
                             className="w-1/4 max-w-lg mx-auto mb-4"/>
                        <p><strong>Artist:</strong> {objectData.artistDisplayName}
                        </p>
                        <p><strong>Culture:</strong> {objectData.culture}</p>
                        <p><strong>Period:</strong> {objectData.period}</p>
                        <p><strong>Dimensions:</strong> {objectData.dimensions}</p>
                        <p><strong>Medium:</strong> {objectData.medium}</p>
                        <p><strong>Credit Line:</strong> {objectData.creditLine}</p>
                        <p><strong>Repository:</strong> {objectData.repository}</p>
                        <p><strong>Object URL:</strong> <a
                            href={objectData.objectURL} className="text-blue-400">View
                            on museum site</a></p>
                        {/* Add more fields as needed */}
                    </>
                )}
            </div>

            <button 
                onClick={goBackOrHome}
                className="text-white"
            >
                Go Back
            </button>
        </>
    );
};

export default ObjectPage;
