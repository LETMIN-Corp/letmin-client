function holderMask(value: string) {
    return value.toUpperCase();
}

function cpfMask(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

function cardNumbermask(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d{1,2})/, '$1 $2')
        .replace(/(\d{4})\d+?$/, '$1');
}

function cnpjMask(value: string) {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

function phoneMask(value: string) {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
}

function phoneDDI(value: string) {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '+$1 $2')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
}

function cepMask(value: string) {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}

function cardValidDateMask(value: string) {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{2})\d+?$/, '$1');
}

function dateWithDashesMask(value: string) {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1-$2')
        .replace(/(-\d{2})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

function cvvMask(value: string) {
    return value.replace(/\D+/g, '').replace(/(\d{3})\d+?$/, '$1');
}

function moneyMask(value: string) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{1})(\d{14})$/, '$1.$2');
    value = value.replace(/(\d{1})(\d{11})$/, '$1.$2');
    value = value.replace(/(\d{1})(\d{8})$/, '$1.$2');
    value = value.replace(/(\d{1})(\d{5})$/, '$1.$2');
    value = value.replace(/(\d{1})(\d{1,2})$/, '$1,$2');
    return value;
}

export {
    cardNumbermask,
    cardValidDateMask,
    cepMask,
    cnpjMask,
    cpfMask,
    cvvMask,
    dateWithDashesMask,
    holderMask,
    moneyMask,
    phoneDDI,
    phoneMask,
};
