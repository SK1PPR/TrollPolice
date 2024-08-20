"use client";
import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LandingPageNavbar from "./components/LandingPageNavbar";
import { ClientContext } from "./context/ClientContext";

function Home() {
  const router = useRouter();
  const operatorId = AccountId.fromString(process.env.NEXT_PUBLIC_OPERATOR_ID);
  const operatorPrivateKey = PrivateKey.fromString(
    process.env.NEXT_PUBLIC_OPERATOR_KEY
  );
  const client = Client.forTestnet();
  client.setOperator(operatorId, operatorPrivateKey);

  return (
    <main className="w-screen h-screen bg-gradient-to-br flex flex-col items-center from-indigo-900 via-violet-600 to-indigo-900 text-white">
      <LandingPageNavbar />
      <ClientContext.Provider value={client}>
        <div className=" w-full h-full flex flex-col items-center justify-center gap-3">
          <Heading className="text-center" size={"9"} weight={"medium"}>
            Securing the process of reporting cyber crimes
          </Heading>
          <Text className="pt-3 pb-20 text-gray-300" size={"5"}>
            Uncovering threats and maintaining anonymity for the reporter
          </Text>
          <button
            className="w-72 text-2xl p-2 font-medium rounded-3xl bg-white text-black ring-4 ring-black uppercase"
            onClick={() => router.push("/form")}
          >
            Report a Crime
          </button>
          <Image
            className="mt-9 rounded-full ring-4 ring-black/30 shadow-2xl"
            src={"/cyber-security-logo.jpg"}
            width={300}
            height={300}
            alt="icon-2"
          />
        </div>
      </ClientContext.Provider>
    </main>
  );
}

export default Home;
