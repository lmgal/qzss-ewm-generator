const intToBin = (int: number, digits: number): string => {
    return int.toString(2).padStart(digits, '0')
}

export { intToBin }