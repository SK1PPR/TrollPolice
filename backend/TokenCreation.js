const {
  TokenType,
  AccountId,
  PrivateKey,
  Client,
  FileCreateTransaction,
  ContractCreateTransaction,
} = require("@hashgraph/sdk");

const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY);

const treasuryAccountId = AccountId.fromString(process.env.TREASURY_ID);
const treasuryKey = PrivateKey.fromString(process.env.TREASURY_KEY);
const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);
//Create the transaction and freeze for manual signing
const transaction = await new TokenCreateTransaction()
  .setTokenName("TipToken")
  .setTokenSymbol("Tip")
  .setTreasuryAccountId(treasuryAccountId)
  .setTokenType(TokenType.FungibleCommon)
  .setInitialSupply(10000)
  .setAdminKey(adminPublicKey)
  .setMaxTransactionFee(new Hbar(30)) //Change the default max transaction fee
  .freezeWith(client);

//Sign the transaction with the token adminKey and the token treasury account private key
const signTx = await (await transaction.sign(adminKey)).sign(treasuryKey);

//Sign the transaction with the client operator private key and submit to a Hedera network
const txResponse = await signTx.execute(client);

//Get the receipt of the transaction
const receipt = await txResponse.getReceipt(client);

//Get the token ID from the receipt
const tokenId = receipt.tokenId;

console.log("The new token ID is " + tokenId);

//////
////minting
////
async function mintTokens(amount) {
  const transaction = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setAmount(amount)
    .setMaxTransactionFee(new Hbar(20)) //Use when HBAR is under 10 cents
    .freezeWith(client);

  //Sign with the supply private key of the token
  const signTx = await transaction.sign(supplyKey);

  //Submit the transaction to a Hedera network
  const txResponse = await signTx.execute(client);

  //Request the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);

  //Get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log(
    "The transaction consensus status " + transactionStatus.toString()
  );
}
