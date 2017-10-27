/// palindrome.ts

/// A palindrome is a word, phrase, number or other sequence
/// of characters which reads the same backward or forward.

/// Problem 1: Tell if a word is a pallindrome.

// Use the reverseString() function we declared.
import { reverseString } from './reverseString'

const isPalindrome = (str:string): boolean => {
    return reverseString(str) === str
}
