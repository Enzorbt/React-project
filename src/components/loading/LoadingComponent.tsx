import React from "react";

const LoadingComponent: React.FC = () => {
    return(
        <div className="flex justify-center items-center space-x-2 pt-4 pb-4">
            <div className="spinner-dot animate-bounce bg-white w-2 h-2 rounded-full"></div>
            <div className="spinner-dot animate-bounce200 bg-white w-2 h-2 rounded-full"></div>
            <div className="spinner-dot animate-bounce400 bg-white w-2 h-2 rounded-full"></div>
        </div>
        
    )
}

export default LoadingComponent;