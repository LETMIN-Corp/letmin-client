interface FormInputInterface {
    label?: string;
    type: string,
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    },
    name: string,
    id: string,
};

const FormInput : React.FC<FormInputInterface> = ({ label, type, consultPackage, name, id }) => {
    return (
        <div className="md:flex items-center">
            {
                label && (
                    <label htmlFor={ id } className='mr-3 w-52'>{ label }</label>
                )
            }
            <input
                type={ type }
                value={ consultPackage.getValue(name) }
                onChange={ consultPackage.setValue }
                name={ name }
                id={ id }
                className='w-full mt-2 mb-5 md:my-4 py-1 px-5 border-2 border-dark-purple rounded-full'
            />
        </div>
    );
}

export default FormInput;
