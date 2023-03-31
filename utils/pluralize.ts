export default (number: number, singularWord: string) => {
    return `${number} ${singularWord}${number > 1 ? 's' : ''}`;
}
