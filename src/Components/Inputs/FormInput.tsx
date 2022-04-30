interface ComponentInterface {
    label?: string;
    type: string,
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    },
    name: string,
    id: string,
};

const FormInput : React.FC<ComponentInterface> = ({ label, type, consultPackage, name, id }) => {
    return (
        <div className='items-center'>
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
                className='w-full mt-2 mb-5 md:mt-2 py-1 px-5 border-2 border-dark-purple rounded-lg'
            />
        </div>
    );
}

export default FormInput;
