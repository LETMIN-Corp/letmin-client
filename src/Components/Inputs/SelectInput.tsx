interface ComponentInterface {
    placeholder?: string
    options: Array<string>,
    size?: 'small' | 'medium' | 'large',
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (e : React.ChangeEvent<HTMLSelectElement>) => void;
    },
    name: string,
    id?: string,
    disabled?: boolean
};

const SelectInput : React.FC<ComponentInterface> = ({ placeholder = '', options, size, consultPackage, name, id, disabled }) => {
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

    function setValue (e: React.ChangeEvent<HTMLSelectElement>) {
        consultPackage.setValue(e);
    }

    const inputValue = consultPackage.getValue(name);

    return (
        <div className={`${ getInputSize() } relative`}>
            <select
                onChange={ setValue }
                name={ name }
                id={ id }
                defaultValue={ inputValue }
                disabled = { disabled }
                className='w-full mt-2 mb-5 md:mt-2 py-2 px-5 border-2 border-dark-purple rounded-lg'
            >
                <option value=''>{ placeholder }</option>

                {
                    options.map((option, key) => (
                        <option  value={ option } key={ key }>{ option }</option>
                    ))
                }
            </select>

            {
                inputValue && (
                    <div className='input-up-animation z-50 bg-white font-medium px-1 text-dark-purple'>{ placeholder }</div>                
                )
            }
        </div>
    );
}

export default SelectInput;
