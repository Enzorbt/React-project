import React, {useEffect, useState} from "react";
import Highlight from "./Highlight";
import ObjectType from "../types/ObjectType.tsx";
import SearchModel from "../models/SearchModel.tsx";

interface HighlightsProps {
    searchModel: SearchModel;
}

const Highlights: React.FC<HighlightsProps> = ({ searchModel }) => {
    const [highlights, setHighlights] = useState<ObjectType[]>([]);

    useEffect(() => {
        searchModel.getHighlights().then(setHighlights);
    }, [searchModel]);

    return (
        <div>
            {highlights.map((highlight) => (
                <Highlight key={highlight.objectID} highlight={highlight} />
            ))}
        </div>
    );
};

export default Highlights;
