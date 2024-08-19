import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <main className="w-screen h-screen bg-gradient-to-br flex flex-col items-center from-indigo-900 via-violet-600 to-indigo-900">
      <Navbar />
      <div className=" w-full h-full flex flex-col items-center justify-center gap-3">
        <Heading className="text-center" size={"9"} weight={"medium"}>
          Securing the process of reporting cyber crimes
        </Heading>
        <Text className="pt-3 pb-20 text-gray-300" size={"5"}>
          Uncovering threats and maintaining anonymity for the reporter
        </Text>
        <button className="w-72 text-2xl p-2 font-medium rounded-3xl bg-white text-black ring-4 ring-black uppercase">
          Report a Crime
        </button>
        <Image className="pt-9" src={"/blockchain-1.png"} width={300} height={300} alt="icon-2" />
      </div>
    </main>
  );
}

export default Home;
