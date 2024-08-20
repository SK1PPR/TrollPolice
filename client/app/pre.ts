import { AccountId, PrivateKey, Client, FileCreateTransaction, ContractCreateTransaction } from "@hashgraph/sdk";

export function preset() {
  const operatorId = AccountId.fromString(process.env.NEXT_PUBLIC_OPERATOR_ID);
  const operatorPrivateKey = PrivateKey.fromString(process.env.NEXT_PUBLIC_OPERATOR_KEY);
  const client = Client.forTestnet();
  client.setOperator(operatorId, operatorPrivateKey);
}
