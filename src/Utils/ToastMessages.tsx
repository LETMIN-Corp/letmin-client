import { ToastContainer, toast } from 'react-toastify';

const ToastLayout = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}

function dispatchError(text : string) {
    toast.error(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

function dispatchSuccess(text : string) {
    toast.success(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

interface IError {
    [key: string]: string,
    map: any,
}

/**
 * This function formats the errors from the backend from an object to a string
    * @param errors
    * @returns string
*/
function formatErrors(errors : any): string {
    if (typeof errors === 'string') {
        return errors;
    }
    
    let errorString = '';
    for (let key in errors) {
        errorString += errors[key] + '. ';
    }
    
    return errorString;
}

export { ToastLayout, formatErrors, dispatchError, dispatchSuccess };