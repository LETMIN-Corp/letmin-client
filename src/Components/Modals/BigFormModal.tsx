import { ReactNode } from 'react';

interface ComponentInterface {
    title: string;
    handleClose: () => void;
    handleConfirm: () => void;
    children: ReactNode;
}

const BigFormModal: React.FC<ComponentInterface> = ({ title, handleClose, handleConfirm, children }) => {
    return (
        <div
            className="fixed z-50 inset-0 overflow-y-auto z-40 drop-shadow-lg"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" aria-hidden="true"></div>
            <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 w-2/3">
                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:w-4/6 sm:max-h-4/5 sm:w-full">
                        <h3 className="pt-4 px-4 text-lg mdtext-xl text-dark-purple">{title}</h3>
                        <div className="px-4">{children}</div>
                        <div className="pb-4 px-4 flex justify-between md:justify-end">
                            <button
                                onClick={handleClose}
                                className="bg-gray text-black w-6/12 md:w-3/12 min-w-sm py-2 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="bg-primary text-white w-6/12 md:w-3/12 min-w-sm py-2 rounded-md ml-2"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigFormModal;
