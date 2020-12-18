export function trimTrailingZeros(numberString) {
  try {
    const type = typeof numberString;
    if (type !== 'string') throw new Error();

    const number = Number(numberString);
    if (Number(number) !== number) throw new Error();

    return number.toString();
  } catch (e) {
    return '';
  }
}
