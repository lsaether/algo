/// Merkle Tree
/// https://en.wikipedia.org/wiki/Merkle_tree

/// Every leaf node is labelled with data and every non-leaf node
/// carries a hash of the child nodes.

import * as sjcl from 'sjcl'
import { isUndefined } from './util'

interface Proof {
    position: string,
    data: sjcl.BitArray,
}

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

    getProof(data: sjcl.BitArray, index?: number): Proof[] {
        const proof = [];
        let idx: number;

        if (typeof index === undefined) {
            idx = -1;

            for (let i = 0; i < this.leaves.length; i++) {
                if(sjcl.bitArray.equal(data, this.leaves[i]) === true) {
                    idx = i;
                }
            }
        } else {
            idx = index!;
        }

        if (idx <= -1) {
            throw Error('Could not find the index of value.')
        }

        for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];
            const isRightNode = idx % 2 === 1;
            const pairIndex = (isRightNode ? idx - 1 : idx + 1);

            /// The proof is the partner node.
            if (pairIndex < row.length) {
                proof.push({
                    position: isRightNode ? 'left' : 'right',
                    data: row[pairIndex],
                })
            }

            // set index to parent index
            idx = (idx / 2)|0;
        }

        return proof;
    }

    verify(proof: Proof[], target: sjcl.BitArray, root: sjcl.BitArray): boolean {
        let tgt = target;

        for (let i = 0; i < proof.length; i++) {
            const node: Proof = proof[i];
            const isLeftNode = (node.position === 'left');
            const buffers = []

            buffers.push(tgt);
            buffers[isLeftNode ? 'unshift' : 'push'](node.data);
            tgt = this.getHash(sjcl.bitArray.concat(buffers[0], buffers[1]));
        }

        return sjcl.bitArray.equal(tgt, root);
    }

    /// https://bitcointalk.org/index.php?topic=403231.msg9054025#msg9054025
    getNodeCount(): number {
        let nodeCount = 1;
        for (let i = this.leaves.length; i > 1; i = (i + 1) >> 1) {
            nodeCount += i;
        }
        return nodeCount;
    }

    private getHash(arg: sjcl.BitArray): sjcl.BitArray {
        let res = this.hashAlgo.update(arg).finalize();
        this.hashAlgo.reset();
        return res;
    }
}
