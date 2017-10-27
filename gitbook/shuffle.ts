///shuffle.ts

import { getRandomInteger } from './randomInteger'

/// Shuffling is a procedure to randomize an array.
/// -> The key property is that each item should have equal
/// probability to end up in any index.

/// The most common algorithm for this is the Fisher-Yates shuffle.
/// It's time complexity is O(n). It can even be done _inplace_ 
/// (whatever that means)
const shuffleInPlace = <T>(array:T[]): T[] => {
    // If there are 0 or 1 items, just return.
    if (array.length <= 1) return array 

    // For each index in array
    for (let i = 0; i < array.length; i++) {

        // Choose a random not-yet-place item to place there
        // must be an item AFTER the current item, because the stuff
        // before has all already been placed.
        const randomChoiceIndex = getRandomInteger(i, array.length - 1);
        /// LOL you needed to place the semi-colon there or else it didn't compile ^

        // Place our random choice in the spot by swapping.
        [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]]
    }

    return array
}
