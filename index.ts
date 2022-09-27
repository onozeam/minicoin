import express from "express";

class TxIn {
  public txOutId: string;
  public txOutIndex: number;
  public signature: string;

  constructor(txOutId: string, txOutIndex: number, signature: string) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.signature = signature;
  }
}

class TxOut {
  public address: string;
  public amount: number;

  constructor(address: string, amount: number) {
    this.address = address;
    this.amount = amount;
  }
}

class Transaction {
  public id: string;
  public txIns: TxIn[];
  public txOuts: TxOut[];

  constructor(id: string, txIns: TxIn[], txOuts: TxOut[]) {
    this.id = id;
    this.txIns = txIns;
    this.txOuts = txOuts;
  }
}

let transactionPool: Transaction[] = [];

class UnspentTxOut {
  public readonly txOutId: string;
  public readonly txOutIndex: number;
  public readonly address: string;
  public readonly amount: string;

  constructor(
    txOutId: string,
    txOutIndex: number,
    address: string,
    amount: string
  ) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }
}

const validateTransaction = (
  transaction: Transaction,
  unspentTxOuts: UnspentTxOut[]
): boolean => {
  // some validation logic
  return true;
};

const isValidTxForPool = (
  tx: Transaction,
  TransactionPool: Transaction[]
): boolean => {
  // some validation logic
  return true;
};

const addToTransactionPool = (
  tx: Transaction,
  unspentTxOuts: UnspentTxOut[]
) => {
  if (!validateTransaction(tx, unspentTxOuts))
    throw Error("is invalid transaction");
  if (!isValidTxForPool(tx, transactionPool))
    throw Error("is invalid transaction for poll");
  transactionPool.push(tx);
};

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public timestamp: number;
  public data: Transaction[];
  public difficulty: number;
  public nonce: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    timestamp: number,
    data: Transaction[],
    difficulty: number,
    nonce: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}

const genesisBlock: Block = new Block(
  0,
  "91a73664bc84c0baa1fc75ea6e4aa6d1d20c5df664c724e3159aefc2e1186627",
  "",
  1465154705,
  [],
  0,
  0
);

const blockchain: Block[] = [genesisBlock];

const httpPort = 3003;
const app = express();
app.get("/blocks", (_, res) => res.send(blockchain));
app.listen(httpPort, () => console.log(`Listening http on port: ${httpPort}`));
