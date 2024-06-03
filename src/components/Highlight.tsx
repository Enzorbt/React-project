import React from 'react';
import ObjectType from "../types/ObjectType.tsx";

interface HighlightProps {
    highlight: ObjectType;
}

const Highlight: React.FC<HighlightProps> = ({ highlight }) => {

    return (
        <div>
            <h2>{highlight.title}</h2>
            <img src={highlight.primaryImage} alt={`Highlight ${highlight.objectID}`} />
            <p>{highlight.department}</p>
        </div>
    );
};

export default Highlight;
