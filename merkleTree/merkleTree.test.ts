import MerkleTree from './merkleTree'
import * as sjcl from 'sjcl'

import { printLine } from './util'

const hashHelper = (arg: any, hashAlgo: sjcl.SjclHash) => {
    let res = hashAlgo.update(arg).finalize();
    hashAlgo.reset();
    return res;
}
// let leaves = ['Strings', 'Add', 'Num']

let leaves = ['Strings', 'Add', 'Num', 'Rando2m', 'Strin323gs', 'Ad232d', 'Num', 'Rando32m', 'Str23ings', 'Add23', 'Nu23m', 'Ra4ndom', '23Strings', 'Ad4', 'Num']
let hasher = new sjcl.hash.sha256();

let hashes = leaves.map((x) => hashHelper(x, hasher));

const tree = new MerkleTree(hashes, hasher)
// const root = tree.getRoot();
// const proof = tree.getProof(hashes[2])
// const verified = tree.verify(proof, hashes[2], root)

// console.log(verified)
console.log(tree.getNodeCount())
// console.log(tree.getRootHex())
// printLine(30)
// console.log(tree.getRowsHex())
// printLine(30)
// console.log(tree.getLeaves())


