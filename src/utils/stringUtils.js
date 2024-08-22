
export const toHtml = (str) => {
    return !!str ? str.replaceAll('\r\n', '<br/>').replaceAll('\n', '<br/>') : '';
}

export const renderDecimal = (value) => {
    return !!value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
}