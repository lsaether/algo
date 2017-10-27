/// Implementation of binary search tree (bst).

import Queue from './gitbook/queue';

/// Interface for the compare function.
export interface ICompareFunction<T> {
    (a: T, b: T): number;
}

/// The default compare function.
export function defaultCompare<T>(a: T, b: T): number {
    if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    } else {
        return 1;
    }
}

/// Checks if undefined input
export function isUndefined(obj: any): boolean {
    return (typeof obj) === 'undefined';
}


/// Interface for a node in the tree.
interface BSTreeNode<T> {
    element?: T;
    leftCh?: BSTreeNode<T> | null;
    rightCh?: BSTreeNode<T> | null;
    parent?: BSTreeNode<T> | null;
}

export default class BSTree<T> {

    private root: BSTreeNode<T> | null;
    private compare: ICompareFunction<T>;
    private nElements: number;
    
    constructor(compareFunction?: ICompareFunction<T>) {
        this.root = null;
        this.compare = defaultCompare; // | compareFunction;
        this.nElements = 0;
    }

    add(element: T): boolean {
        if (isUndefined(element)) {
            return false;
        }

        if(this.insertNode(this.createNode(element)) !== null) {
            this.nElements++;
            return true;
        }
        return false;
    }

    clear(): void {
        this.root = null;
        this.nElements = 0;
    }

    isEmpty(): boolean {
        return this.nElements === 0;
    }

    size(): number {
        return this.nElements;
    }

    contains(element: T): boolean {
        if (isUndefined(element)) {
            return false;
        }
        return this.searchNode(this.root, element) !== null;
    }

    remove(element: T): boolean {
        const node = this.searchNode(this.root, element);
        if (node === null) {
            return false;
        }
        this.removeNode(node);
        this.nElements--;
        return true;
    }

    /// TODO fix type any for callback
    inorderTraversal(callback: any): void {
        this.inorderTraversalAux(this.root, callback, {
            stop: false,
        });
    } 

    preorderTraversal(callback: any): void {
        this.preorderTraversalAux(this.root, callback, {
            stop: false,
        });
    }

    postorderTraversal(callback: any): void {
        this.postorderTraversalAux(this.root, callback, {
            stop: false,
        });
    }

    levelTraversal(callback: any): void {
        this.levelTraversalAux(this.root, callback);
    }

    minimum(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.minimumAux(this.root).element;
    }

    maximum(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.maximumAux(this.root).element;
    }

    forEach(callback: any): void {
        this.inorderTraversal(callback);
    }

    toArray(): T[] {
        const array: Array<T> = [];
        this.inorderTraversal((element: T): boolean => {
            array.push(element);
            return true;
        });
        return array;
    }

    height(): number {
        return this.heightAux(this.root);
    }

    private searchNode(node: BSTreeNode<T>, element: T): BSTreeNode<T> {
        let cmp: number | null = null;
        while (node !== null && cmp !== 0) {
            cmp = this.compare(element, node.element);
            if (cmp < 0) { // -1
                node = node.leftCh;
            } else if (cmp > 0) { // 1
                node = node.rightCh;
            }
        }
        return node;
    }

    private transplant(n1: BSTreeNode<T>, n2: BSTreeNode<T>): void {
        if (n1.parent === null) {
            this.root = n2;
        } else if (n1 === n1.parent.leftCh) {
            n1.parent.leftCh = n2;
        } else {
            n1.parent.rightCh = n2;
        }
        if (n2 !== null) {
            n2.parent = n1.parent;
        }
    }

    private removeNode(node: BSTreeNode<T>): void {
        if (node.leftCh === null) {
            this.transplant(node, node.rightCh);
        } else if (node.rightCh === null) {
            this.transplant(node, node.leftCh);
        } else {
            const y = this.minimumAux(node.rightCh);
            if (y.parent !== node) {
                this.transplant(y, y.rightCh);
                y.rightCh = node.rightCh;
                y.rightCh.parent = y;
            }
            this.transplant(node, y);
            y.leftCh = node.leftCh;
            y.leftCh.parent = y;
        }
    }

    private inorderTraversalAux(node: BSTreeNode<T>, callback: any, signal: { stop: boolean }): void {
        if (node === null || signal.stop) {
            return;
        }
        this.inorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        } 
        signal.stop = callback(node.element) === false;
        if (signal.stop) {
            return;
        }
        this.inorderTraversalAux(node.rightCh, callback, signal);
    }

    private levelTraversalAux(node: BSTreeNode<T>, callback: any) {
        const queue = new Queue<BSTreeNode<T>>();
        if (node !== null) {
            queue.push(node);
        }
        while (!queue.isEmpty()) {
            node = queue.pop();
            if (callback(node.element) === false) {
                return;
            }
            if (node.leftCh !== null) {
                queue.push(node.leftCh);
            }
            if (node.rightCh !== null) {
                queue.push(node.rightCh);
            }
        }
    }

    private preorderTraversalAux(node: BSTreeNode<T>, callback: any, signal: { stop: boolean }) {
        if (node === null || signal.stop) {
            return;
        }
        signal.stop = callback(node.element) === false;
        if (signal.stop) {
            return;
        }
        this.preorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        }
        this.preorderTraversalAux(node.rightCh, callback, signal);
    }

    private postorderTraversalAux(node: BSTreeNode<T>, callback: any, signal: { stop: boolean }) {
        if (node === null || signal.stop) {
            return;
        }
        this.postorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        }
        this.postorderTraversalAux(node.rightCh, callback, signal);
        if (signal.stop) {
            return;
        }
        signal.stop = callback(node.element) === false;
    }

    private minimumAux(node: BSTreeNode<T>): BSTreeNode<T> {
        while (node.leftCh !== null) {
            node = node.leftCh;
        }
        return node;
    }

    private maximumAux(node: BSTreeNode<T>): BSTreeNode<T> {
        while (node.rightCh !== null) {
            node = node.rightCh;
        }
        return node;
    }

    private heightAux(node: BSTreeNode<T>): number {
        if (node === null) {
            return -1;
        }
        return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) +1;
    }

    private insertNode(node: BSTreeNode<T>): BSTreeNode<T> {
        let parent: any = null;
        let position = this.root;
        let cmp: number | null = null;

        while (position !== null) {
            cmp = this.compare(node.element, position.element);
            if (cmp === 0) {
                return null;
            } else if (cmp < 0) {
                parent = position;
                position = position.leftCh;
            }
        }
        node.parent = parent;
        if (parent === null) {
            // The tree is empty.
            this.root = node;
        } else if (this.compare(node.element, parent.element) < 0) {
            parent.leftCh = node;
        } else {
            parent.rightCh = node;
        }
        return node;
    }

    private createNode(element: T): BSTreeNode<T> {
        return  {
            element: element,
            leftCh: null,
            rightCh: null,
            parent: null,
        };
    }
}
