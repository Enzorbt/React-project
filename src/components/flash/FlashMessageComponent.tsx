import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useFlashes } from "../../providers/FlashesProvider.tsx";
import { useEffect } from "react";

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

    if (!flashMessage) return null;

    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50">
            <div className={`max-w-md mx-auto flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg ${flashMessage.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : flashMessage.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-yellow-100 border border-yellow-400 text-yellow-700'}`}>
                {getIcon(flashMessage.type)}
                <div>{flashMessage.message}</div>
                <button onClick={clearFlashMessage} className="ml-auto">
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default FlashMessageComponent;
