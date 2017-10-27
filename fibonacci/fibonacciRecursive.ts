/// Fibonacci Numbers

const fibonacciRecursive = (n: number): number => {
    return n < 2 ? n : fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

console.log(fibonacciRecursive(33))
