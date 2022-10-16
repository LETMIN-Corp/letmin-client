import InputTypesEnum from "../../Enums/InputTypesEnum";

interface ComponentInterface {
    options: Array<string>;
    size?: 'small' | 'medium' | 'large' | 'full';
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    name: string;
    id?: string;
    labelClass?: string;
    disabled?: boolean;
}

const RadioInput: React.FC<ComponentInterface> = ({ options, size, consultPackage, name, id, labelClass = '', disabled }) => {
    const getInputSize = () => {
        switch (size) {
            case 'small':
                return 'md:w-3/12';
            case 'medium':
                return 'md:w-5/12';
            case 'large':
                return 'md:w-6/12';
            case 'full':
                return 'w-full';

        }
    };

    function setValue(e: React.ChangeEvent<HTMLInputElement>) {
        consultPackage.setValue(e);
    }

    const inputValue = consultPackage.getValue(name);

    const classes = "cursor-pointer " + labelClass;

    return (
        <div className={`${getInputSize()} relative`}>
            <div className="flex flex-col">
                {options.map((option, key) => (
                    <div key={key} className="flex items-center">
                        <input
                            onChange={setValue}
                            type={InputTypesEnum.radio}
                            name={name}
                            id={`${id}-${key}`}
                            value={option}
                            checked={inputValue === option}
                            disabled={disabled}
                            className="mr-2"
                        />

                        <label htmlFor={`${id}-${key}`} className={classes}>
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioInput;