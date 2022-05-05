import { useState } from 'react';
import { cnpjMask, cpfMask, cardValidDateMask, cvvMask, phoneMask, cardNumbermask, holderMask } from '../../Utils/InputMasks';
import InputTypesEnum from '../../Utils/InputTypesEnum';
import MaskTypesEnum from '../../Utils/MaskTypesEnum';

interface ComponentInterface {
    type: string,
    placeholder?: string
    size?: 'small' | 'medium' | 'large',
    useMask?: string,
    consultPackage: {
        getValue: (name: string) => string;
        setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    },
    name: string,
    id: string,
};

const TextInput : React.FC<ComponentInterface> = ({ type, placeholder, size, useMask, consultPackage, name, id }) => {
    const [showPassword, setShowPassword] = useState(false);

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

    function selectMask (value : string) {
        switch(useMask) {
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
        }

        return value;
    }

    function setValue (e: React.ChangeEvent<HTMLInputElement>) {
        e.target.value = selectMask(e.target.value);

        consultPackage.setValue(e);
    }

    const inputValue = consultPackage.getValue(name);

    const isPassword = type === InputTypesEnum.password;
    if(isPassword && showPassword) {
        type = InputTypesEnum.text;
    }

    return (
        <div className={`${ getInputSize() } relative`}>
            <input
                type={ type }
                placeholder={ placeholder }
                value={ inputValue }
                onChange={ setValue }
                name={ name }
                id={ id }
                className='w-full md:text-lg mt-2 mb-5 md:mt-2 py-3 px-5 border-2 border-dark-purple rounded-lg'
            />
            {
                isPassword && (
                    <div className='absolute top-5 right-5'>
                        {
                            <i onClick={ () => setShowPassword(!showPassword) } className={`${ showPassword ? 'fa-eye' : 'fa-eye-slash' } cursor-pointer fa-solid  text-xl text-dark-purple`}></i>
                        }
                    </div>
                )
            }
            {
                inputValue && (
                    <div className='input-up-animation z-50 bg-white font-medium px-1 text-dark-purple'>{ placeholder }</div>
                )
            }
        </div>
    );
}

export default TextInput;
