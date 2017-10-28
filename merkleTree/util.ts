
/// Prints a line onto console with specified line length.
export const printLine = (lineLength: number): void => {
    console.log('-'.repeat(lineLength))
}

export const isUndefined = (obj: any): boolean => {
    return (typeof obj === 'undefined')
}
