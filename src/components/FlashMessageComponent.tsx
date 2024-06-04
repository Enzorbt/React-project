import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import {useFlashes} from "../providers/FlashesProvider.tsx";
import {useEffect} from "react";

const FlashMessageComponent = () => {
    const { flashMessage, clearFlashMessage } = useFlashes();

    const getIcon = (type: 'success' | 'error') => {
        if (type === 'error') return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
        if (type === 'success') return <CheckCircleIcon className="h-5 w-5 text-green-500" />
        return <XMarkIcon className="h-5 w-5 text-yellow-500" />
    }

    useEffect(() => {
        if (flashMessage) {
            const timeout = setTimeout(() => {
                clearFlashMessage();
            }, 10000);

            return () => clearTimeout(timeout);
        }
    }, [flashMessage, clearFlashMessage]);

    return (
        <div>
            {flashMessage && (
                <div className={`flex flex-row items-center space-x-2 ${flashMessage.type === 'error' ? 'text-red-700 ' : flashMessage.type === 'success' ? 'text-green-700' : 'text-yellow-700'}`}>
                    {flashMessage && getIcon(flashMessage.type)}
                    <div>{flashMessage.message}</div>
                </div>
            )}
        </div>
    );
};

export default FlashMessageComponent;
