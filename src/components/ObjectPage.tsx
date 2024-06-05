import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ObjectModel from '../models/ObjectModel';
import ObjectType from '../types/ObjectType';
import { useFlashes } from "../providers/FlashesProvider.tsx";

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

    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto p-6">
                <button
                    onClick={goBackOrHome}
                    className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                    Go Back
                </button>

                {objectData && (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h1 className="text-4xl font-bold mb-6 text-center">{objectData.title}</h1>
                        <div className="flex flex-col md:flex-row">
                            <img
                                src={objectData.primaryImage}
                                alt={objectData.title}
                                className="md:w-1/2 w-full max-w-lg mx-auto mb-6 md:mb-0 rounded-lg shadow-lg"
                            />
                            <div className="md:ml-6 space-y-4">
                                <p><strong>Artist:</strong> {objectData.artistDisplayName}</p>
                                <p><strong>Culture:</strong> {objectData.culture}</p>
                                <p><strong>Period:</strong> {objectData.period}</p>
                                <p><strong>Dimensions:</strong> {objectData.dimensions}</p>
                                <p><strong>Medium:</strong> {objectData.medium}</p>
                                <p><strong>Credit Line:</strong> {objectData.creditLine}</p>
                                <p><strong>Repository:</strong> {objectData.repository}</p>
                                <p>
                                    <strong>Object URL:</strong>
                                    <a
                                        href={objectData.objectURL}
                                        className="text-blue-400 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View on museum site
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ObjectPage;
