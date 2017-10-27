/// fizzbuzz.ts

/// Write a program that prints the numbers from 1 to 100.
/// For muliples of three it prints "Fizz" instead of the number
/// and for muliples of five print "Buzz". For multiples of both
/// three and fize, print "FizzBuzz"
for (let i = 1; i <= 100; i++) {
    const t = i % 3 == 0, f = i % 5 == 0
    console.log(
        t && f ? "FizzBuzz"
        : t ? "Fizz"
        : f ? "Buzz"
        : i
    )
}
