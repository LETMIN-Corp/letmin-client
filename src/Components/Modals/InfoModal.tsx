import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ComponentInterface {
    title: string;
    children: React.ReactNode;
    handleClose: () => void;
    showIcon?: boolean;
}

const InfoModal: React.FC<ComponentInterface> = ({
    title,
    children,
    handleClose,
    showIcon = true,
}) => {
    return (
        <div
            className="fixed z-50 inset-0 overflow-y-auto drop-shadow-lg"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
                aria-hidden="true"
            ></div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full">
                        <div className="bg-white pt-5 px-4 sm:px-6 pb-0">
                            <div className="sm:items-start block">
                                {showIcon && (
                                    <div className="mx-auto flex-shrink-0 md:mr-4 flex items-center justify-center h-12 sm:mx-0 sm:h-10 sm:w-10">
                                        <FontAwesomeIcon
                                            icon={faInfo}
                                            className="text-4xl"
                                        />
                                    </div>
                                )}
                                <div className="mt-3 text-justify sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium"
                                        id="modal-title"
                                    >
                                        {title}
                                    </h3>
                                    <div className="mt-2">{children}</div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 pb-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
