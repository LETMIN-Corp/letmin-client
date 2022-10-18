interface ComponentInterface {
    placeholder?: string;
    row: number;
    limit?: number;
    value?: string;
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    };
    name: string;
    id?: string;
    disabled?: boolean;
    resize?: boolean;
}

const TextAreaInput: React.FC<ComponentInterface> = ({
    row,
    value,
    resize = true,
    placeholder,
    limit = 512,
    consultPackage,
    name,
    id,
    disabled,
}) => {
    function setValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.value.length <= limit) {
            consultPackage.setValue(e);
        }
    }

    const inputValue = consultPackage.getValue(name);

    return (
        <div className={`relative`}>
            <textarea
                placeholder={placeholder}
                name={name}
                onInput={setValue}
                rows={row}
                id={id}
                defaultValue={inputValue || value}
                className={`w-full mb-5 mt-2 py-3 px-5 border-2 border-dark-purple rounded-md ${
                    disabled || !resize ? 'resize-none' : ''
                }`}
                disabled={disabled}
            ></textarea>
            {(inputValue || value) && (
                <div className="input-up-animation z-10 bg-white font-medium px-1 text-dark-purple">{placeholder}</div>
            )}
        </div>
    );
};

export default TextAreaInput;
