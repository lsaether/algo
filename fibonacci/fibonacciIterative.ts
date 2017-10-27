/// Fibonacci Iterative Version

const fibIter = (n: number): number => {
    let i = 1, j = 0, k, t;
    for (k = 1; k <= Math.abs(n); k++) {
        t = i + j;
        i = j;
        j = t;
    }
    if (n < 0 && n % 2 === 0) j = -j;
    return j;
}

console.log(fibIter(33))
