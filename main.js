//npm install --save crypto-js
const SHA256 = require('crypto-js/sha256');
class Block {
	constructor(index, timestamp, data, previoushash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previoushash = previoushash;
		this.nounce = 0;
	}
//calculate hashvalue of Block
	calculateHash() {
		return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nounce++;
			this.hash = this.calculateHash();
		}

		console.log("Block Mined: " + this.hash);
	}
}

class BlockChain{
	constructor(){
		this.chain = [this.createGenesisBlock];
		this.difficulty = 5;
	}

	createGenesisBlock() {
		return new Block(0, "01/01/1995", "GenesisBlock", "0");
	}

	getlatestBlock(){
		return this.chain[this.chain.length -1];
	}

	addBlock(newBlock){
		newBlock.previoushash = this.getlatestBlock.hash;
		newBlock.mineBlock(this.difficulty);
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	ischainValid() {
		for(let i = 1; i< this.chain.length; i++)
		{
			if(this.chain[i].previoushash !== this.chain[i-1].hash){
				return false;	
			}

			if(this.chain[i].hash !== this.chain[i].calculateHash){
				return false;	
			}
		}

		return true;
	}
}


let KRCoin = new BlockChain();
KRCoin.addBlock(new Block(1, "01/02/1995", {amount: 4}));
KRCoin.addBlock(new Block(2, "11/03/1995", {amount: 1000}));



console.log(JSON.stringify(KRCoin, null, 4));