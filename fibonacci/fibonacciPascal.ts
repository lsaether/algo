/// Fibonacci Pascal Version
/// The "more efficient" solution.
const fibPascal = (n: number): number => {
    const sqrt5 = Math.sqrt(5);
    return Math.round(Math.pow(((1 + sqrt5) / 2), n) / sqrt5);
}

console.log(fibPascal(33))
