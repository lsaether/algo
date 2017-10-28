/// Merkle Tree
/// https://en.wikipedia.org/wiki/Merkle_tree

/// Every leaf node is labelled with data and every non-leaf node
/// carries a hash of the child nodes.

///<reference path='node_modules/@types/node/index.d.ts'/>

import * as sjcl from 'sjcl'
import { isUndefined } from './util'

export default class MerkleTree {

    private hashAlgo: sjcl.SjclHash;

    private root: sjcl.BitArray | null;
    private leaves: sjcl.BitArray[];
    private rows: Array<sjcl.BitArray>[];

    constructor(leaves: sjcl.BitArray[], hashAlgorithm: sjcl.SjclHash) {
        this.hashAlgo = hashAlgorithm;
        this.leaves = leaves;
        this.rows = [leaves];

        this.buildTree(this.leaves)
    }

    buildTree(hashes: sjcl.BitArray[]): boolean {
        const nHashes = hashes.length;  

        if (nHashes === 1) {
            this.root = hashes[0];
            return true;
        }

        const rowIndex = this.rows.length;

        this.rows.push([])

        for (let i = 0; i < nHashes - 1; i += 2) {
            const left = hashes[i].slice();
            const right = hashes[i + 1].slice();

            let data = sjcl.bitArray.concat(left, right);

            let hash = this.getHash(data);

            this.rows[rowIndex].push(hash);
        }

        /// Duplicate last hash if odd.
        if (nHashes % 2 === 1) {
            const last = hashes[hashes.length - 1];
            this.rows[rowIndex].push(this.getHash(sjcl.bitArray.concat(last, last)));
        }

        /// Recursively build the tree.
        this.buildTree(this.rows[rowIndex])

        // Should never get here.
        return false;
    }

    private getHash(arg: sjcl.BitArray): sjcl.BitArray {
        let res = this.hashAlgo.update(arg).finalize();
        this.hashAlgo.reset();
        return res;
    }

    getLeaves(): any[] {
        return this.leaves;
    }

    getRows(): any[] {
        return this.rows;
    }

    getRoot(): sjcl.BitArray {
        if (typeof this.root === null) {
            throw Error("Tree not initialized.")
        }
        return this.root!;
    }

    getLeavesHex(): string[] {
        return this.leaves.map((x) => sjcl.codec.hex.fromBits(x));
    }

    getRowsHex(): string[][] {
        let hexRows: string[][] = [];
        this.rows.forEach((row) => {
            hexRows.push(row.map((x) => sjcl.codec.hex.fromBits(x)));
        });
        return hexRows;
    }

    getRootHex(): string {
        return sjcl.codec.hex.fromBits(this.getRoot())
    }
}

