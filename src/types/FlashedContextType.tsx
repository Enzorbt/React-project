import FlashMessageType from "./FlashMessageType.tsx";
import React from "react";

type FlashedContextType = {
    flashMessage: FlashMessageType | null;
    setFlashMessage: React.Dispatch<React.SetStateAction<FlashMessageType | null>>;
    clearFlashMessage: () => void;
}

export default FlashedContextType;