/// basicSort.ts

/// Mostly always best off using the built in sort method like so:
let xs = [5,4,3,-22,1]
xs.sort((a,b) => a - b) // Ascending sort
console.log(xs)
xs.sort((a,b) => b - a) // Descending sort
console.log(xs)
/// Or use .reverse()
xs.reverse()
console.log(xs)
