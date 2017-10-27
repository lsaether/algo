/// Simply reverse a string.

/// In JavaScript, string does not have a reverse method, but
/// you can use Array.prototype.reverse instead.
function reverse(str: string) {
    return str.split('').reverse().join()
}

/// Or,
export const reverseString = (str:string): string => {
    return str.split('').reverse().join()
}
 