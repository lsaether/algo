/// insertSort.ts

/// Go from left to right and step by step put each card in its
/// right place.

/**
 * Time complexity: O(N^2)
 */
function insertSort<T> (
    array:T[], 
    cmp:{(a:T,b:T): number} = (a: any, b:any) => a - b
): T[] {
    let current: T
    let j: number
    for (let i = 0; i < array.length; i++) {
        current = array[i]
        j = i -1
        while (j >= 0 && cmp(array[j], current) > 0) {
            array[j + 1] = array[j]
            j -= 1
        }
        array[j +1] = current
    }
    return array
}

let x = [22,3,5,765,44,1,4]
console.log(insertSort(x)) // [1,3,4,5,22,44,765]
