const { TokenType, AccountId, PrivateKey, Client } = require("@hashgraph/sdk");

const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY);

const treasuryId = AccountId.fromString(process.env.TREASURY_ID);
const treasuryKey = PrivateKey.fromString(process.env.TREASURY_KEY);
const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);
//Create a fungible token
let tokenCreateTx = await new TokenCreateTransaction()
  .setTokenName("Tip Token")
  .setTokenSymbol("Tip")
  .setTokenType(TokenType.FungibleCommon)
  .setDecimals(2)
  .setInitialSupply(10000)
  .setTreasuryAccountId(treasuryId)
  .setSupplyType(TokenSupplyType.Infinite)
  .setSupplyKey(supplyKey)
  .freezeWith(client);

//SIGN WITH TREASURY KEY
let tokenCreateSign = await tokenCreateTx.sign(treasuryKey);
//SUBMIT THE TRANSACTION
let tokenCreateSubmit = await tokenCreateSign.execute(client);
//GET THE TRANSACTION RECEIPT
let tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
//GET THE TOKEN ID
let tokenId = tokenCreateRx.tokenId;

//LOG THE TOKEN ID TO THE CONSOLE
console.log(`- Created token with ID: ${tokenId} \n`);

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
