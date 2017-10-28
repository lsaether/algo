const treehash = (start: Leaf, maxHeight: number) => {
	/// Set leaf = start and create an empty stack.
	let leaf: Leaf = start;
	let stack = [];

	...
}

const computeRoot = () => {
	if (this.leaves.length === 1) {
		this.root = this.hashAlgo(this.leaves[0].element.toString());
		return true;
	}
	
	/// Construct a row.
	let row: MerkleNode[];
	let i = 0;
	while (i + 1 < leaves.length) {
		row.push(this.merkleNodeHash(this.leaves[i], this.leaves[i + 1]));
		i += 2;
	}

	/// Duplicate the last element if the number of nodes is odd.
	if (this.leaves.length % 2 === 1) {
		const last = this.leaves[this.leaves.length - 1];
		row.push(merkleNodeHash(last, last));
	}

	if (computeRootRecursive(row) !== null) {
		this.root = computeRootRecursive(row);
		return true;
	}
	
	/// Error ocurred.
	return false;
}
