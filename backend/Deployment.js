const fs = require("node:fs/promises");
require("dotenv").config();

const {
  AccountId,
  PrivateKey,
  Client,
  FileCreateTransaction,
  ContractCreateTransaction,
} = require("@hashgraph/sdk");

if (process.env.OPERATOR_ID == null || process.env.OPERATOR_KEY == null) {
  throw new Error(
    "Environment variables OPERATOR_ID, OPERATOR_KEY are required."
  );
}

const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY);
const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);

//all except token because it needs to be deployed using HTS and not HSCS
const ContractName = [
  "EIP712Base_sol_EIP712Base",
  "EIP712MetaTransaction_sol_EIP712MetaTransaction",
  "Migrations_sol_Migrations",
  "SafeMath_sol_SafeMath",
  "TipOff_sol_TipOff",
];
async function main() {
  let evmBytecode = [];
  for (const name in ContractName) {
    const bytecode = await fs.readFile(`./bytecode/${name}.bin`, {
      encoding: "utf8",
    });
    evmBytecode.push(bytecode);
  }

  let fileId = [];
  for (let i = 0; i < evmBytecode.length; i++) {
    const fileCreate = new FileCreateTransaction().setContents(
      evmBytecode[i].toString()
    );
    const fileCreateTx = await fileCreate.execute(client);
    const fileCreateReceipt = await fileCreateTx.getReceipt(client);
    console.log("HFS FileCreateTransaction", fileCreateReceipt);
    const fId = fileCreateReceipt.fileId;
    fileId.push(fId);
  }

  let scId = [];
  for (let i = 0; i < fileId.length; i++) {
    const scDeploy = new ContractCreateTransaction()
      .setBytecodeFileId(fileId[i])
      .setGas(100_000);
    const scDeployTx = await scDeploy.execute(client);
    const scDeployReceipt = await scDeployTx.getReceipt(client);
    console.log("HSCS ContractCreateTransaction", scDeployReceipt);
    const scid = scDeployReceipt.contractId;
    scId.push(scid);

    //Paste the obtained smarct contract ID in here ,https://hashscan.io/testnet/dashboard
    console.log(`Deployed to ${scId}`);
  }
  process.exit(0);
}

main();
