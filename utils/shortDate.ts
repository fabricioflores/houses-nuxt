export default (strDate: string) => {
    const date = new Date(strDate);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
}
