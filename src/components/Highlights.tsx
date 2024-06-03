import React, {useEffect, useState} from "react";
import Highlight from "./Highlight";
import ObjectType from "../types/ObjectType.tsx";
import SearchModel from "../models/SearchModel.tsx";
import {useFlashes} from "../providers/FlashesProvider.tsx";

interface HighlightsProps {
    searchModel: SearchModel;
}

const Highlights: React.FC<HighlightsProps> = ({ searchModel }) => {
    const [highlights, setHighlights] = useState<ObjectType[]>([]);
    const {setFlashMessage}= useFlashes(); // Get setFlashMessage function
    // from useFlashed hook

    useEffect(() => {
        searchModel.getHighlights()
            .then(
            setHighlights
        )
            .catch(error => {
                    console.error('Error fetching highlights', error);
                    setFlashMessage({ message: 'Error fetching highlights, ' + error, type: 'error' }); // Set error flash message
                });
    }, [searchModel]);

    return (
        <div>
            HIGHLIGHTS:
            {highlights.map((highlight) => (
                <Highlight key={highlight.objectID} highlight={highlight} />
            ))}
        </div>
    );
};

export default Highlights;
