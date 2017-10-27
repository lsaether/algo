/// stack.ts

/// A stack is a last-in first-out (LIFO) data structure.
/// Javascripts has .push() or .pop()
let array:number[] = [1,2,3]
array.push(4)
array.push(5)
array.pop()
console.log(array)
// console.assert(array === [1,2,3,4])

/// Typescript has these too, although you can also do this as a 
/// class based approach-- because, why not Typescript.
class Stack<T> {
    _store: T[] = []
    
    push = (val:T) => this._store.push(val)

    pop = (): T | undefined => {
        return this._store.pop()
    }
}

let stack = new Stack()
stack.push('one')
stack.push('two')
stack.push('three')
stack.pop()
// We shouldn't actually access a private variable like this but...
console.log(stack._store)