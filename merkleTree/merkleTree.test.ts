import MerkleTree from './merkleTree'
import * as sjcl from 'sjcl'

import { printLine } from './util'

const hashHelper = (arg: any, hashAlgo: sjcl.SjclHash) => {
    let res = hashAlgo.update(arg).finalize();
    hashAlgo.reset();
    return res;
}
// let leaves = ['Strings', 'Add', 'Num']

let leaves = ['a', 'b', 'c']
let hasher = new sjcl.hash.sha256();

let hashes = leaves.map((x) => hashHelper(x, hasher));

const tree = new MerkleTree(hashes, hasher)
const root = tree.getRoot();
const proof = tree.getProof(hashes[2])
// const verified = tree.verify(proof, hashes[2], root)

console.log(tree.getRootHex())
console.log(proof)
// console.log(verified)
console.log(tree.getNodeCount())
// console.log(tree.getRootHex())
// printLine(30)
// console.log(tree.getRowsHex())
// printLine(30)
// console.log(tree.getLeaves())


