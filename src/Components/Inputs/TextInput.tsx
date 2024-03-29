import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import InputTypesEnum from '../../Enums//InputTypesEnum';
import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import {
    cardNumbermask,
    cardValidDateMask,
    cnpjMask,
    cpfMask,
    cvvMask,
    holderMask,
    integerMask,
    moneyMask,
    phoneMask,
} from '../../Utils/InputMasks';

interface ComponentInterface {
    type: string;
    placeholder?: string;
    size?: 'small' | 'normal' | 'medium' | 'large' | 'extra-large';
    useMask?: string;
    limit?: number;
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    } | any;
    name: string;
    value?: string;
    id?: string;
    min?: number;
    max?: number;
    disabled?: boolean;
    required?: boolean;
}

const TextInput: React.FC<ComponentInterface> = ({
    type,
    placeholder,
    size,
    value,
    useMask,
    limit = 512,
    consultPackage,
    name,
    id,
    min,
    max,
    disabled,
    required,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const getInputSize = () => {
        switch (size) {
            case 'small':
                return 'md:w-3/12';
            case 'normal':
                return 'md:w-4/12';
            case 'medium':
                return 'md:w-5/12';
            case 'large':
                return 'md:w-6/12';
            case 'extra-large':
                return 'md:w-7/12';
        }
    };

    function selectMask(value: string) {
        switch (useMask) {
            case MaskTypesEnum.holder:
                return holderMask(value);
            case MaskTypesEnum.cpf:
                return cpfMask(value);
            case MaskTypesEnum.cnpj:
                return cnpjMask(value);
            case MaskTypesEnum.date:
                return cardValidDateMask(value);
            case MaskTypesEnum.cvv:
                return cvvMask(value);
            case MaskTypesEnum.phone:
                return phoneMask(value);
            case MaskTypesEnum.cardNumber:
                return cardNumbermask(value);
            case MaskTypesEnum.money:
                return moneyMask(value);
            case MaskTypesEnum.integer:
                return integerMask(value);
        }

        return value;
    }

    function setValue(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.value = selectMask(e.target.value);

        if (e.target.value.length <= limit) {
            consultPackage.setValue(e);
        }
    }

    const inputValue = consultPackage.getValue(name);

    const isPassword = type === InputTypesEnum.password;
    if (isPassword && showPassword) {
        type = InputTypesEnum.text;
    }

    return (
        <div className={`${getInputSize()} relative`}>
            <input
                type={type}
                placeholder={placeholder + (required ? ' *' : '')}
                value={inputValue}
                onChange={setValue}
                name={name}
                id={id}
                min={min}
                max={max}
                className="w-full mt-2 mb-5 md:mt-2 py-2 px-5 border-2 border-dark-purple rounded-md text-md"
                disabled={disabled}
                required={required}
            />
            {isPassword && (
                <div className="absolute top-5 right-2">
                    {
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer fa-solid  text-xl text-dark-purple"
                        />
                    }
                </div>
            )}
            {(inputValue || type == InputTypesEnum.date || value) && (
                <div className="input-up-animation z-10 bg-white font-medium px-1 text-dark-purple">
                    {placeholder + (required ? ' *' : '')}
                </div>
            )}
        </div>
    );
};

export default TextInput;
