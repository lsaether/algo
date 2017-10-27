/// queue.ts

/// A queue is a first-in first-out (FIFO) data structure.
/// In Javascript it's trivial to implement with the push() and
/// shift() methods.
let queue:number[] = []
queue.push(0)
queue.push(1)
console.log(queue) // [0 , 1]
queue.shift()
console.log(queue) // [1]

/// In Typescript you can also do this with a class.
export default class Queue<T> {
    _store:T[] = []

    push = (val:T) => this._store.push(val)

    pop = (): T | undefined => {
        return this._store.shift()
    }

    isEmpty = (): boolean => {
        return this._store.length === 0
    }
}
