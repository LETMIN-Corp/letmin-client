interface ComponentInterface {
    type: string,
    placeholder?: string
    size?: 'small' | 'medium' | 'large',
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    },
    name: string,
    id: string,
};

const FormInput : React.FC<ComponentInterface> = ({ type, placeholder, size, consultPackage, name, id }) => {
    const getInputSize = () => {
        switch(size) {
            case 'small':
                return 'md:w-3/12';
            case 'medium':
                return 'md:w-5/12';
            case 'large':
                return 'md:w-6/12'
        }
    }

    return (
        <input
            type={ type }
            placeholder={ placeholder }
            value={ consultPackage.getValue(name) }
            onChange={ consultPackage.setValue }
            name={ name }
            id={ id }
            className={`${ getInputSize() } w-full md:text-lg mt-2 mb-5 md:mt-2 py-3 px-5 border-2 border-dark-purple rounded-lg`}
        />
    );
}

export default FormInput;
