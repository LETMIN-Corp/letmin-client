interface ComponentInterface {
    placeholder?: string,
    row: number,
    limit?: number,
    value?: string,
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    },
    name: string,
    id?: string,
    disabled?: boolean,
};

const TextAreaInput : React.FC<ComponentInterface> = ({ row, value, placeholder, limit = 512, consultPackage, name, id, disabled }) => {

    function setValue (e: React.ChangeEvent<HTMLTextAreaElement>) {

        if (e.target.value.length <= limit) {
            consultPackage.setValue(e);        
        }
    }

    const inputValue = consultPackage.getValue(name);

    return (
        <div className={`relative`}>
            <textarea
                placeholder={ placeholder }
                name={ name }
                onChange={ setValue }
                rows={ row }
                id={ id }
                className='w-full mb-5 mt-2 py-3 px-5 border-2 border-dark-purple rounded-md'
                disabled = { disabled }
            >
                { inputValue || value }
            </textarea>
            {
                (inputValue || value) && (
                    <div className='input-up-animation z-50 bg-white font-medium px-1 text-dark-purple'>{ placeholder }</div>
                )
            }
        </div>
        
    );
}

export default TextAreaInput;
