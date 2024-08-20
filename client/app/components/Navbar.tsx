import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className="w-screen flex items-center justify-between shadow-lg ring-1 ring-black/5 bg-slate-800/40 rounded-xl">
      <Link href={"/"}>
        <div className="flex items-center p-8 gap-2">
          <Image src={"/cyber-security.png"} width={40} height={40} alt="icon" />
          <Heading as="h1" size={"7"} weight={"medium"}>
            Troll Police
          </Heading>
        </div>
      </Link>

      <div className="flex items-center gap-9 p-8 uppercase">
        <Link href={"/user-dashboard"}>
          <Text size={"4"} weight={"medium"}>
            Dashboard
          </Text>
        </Link>
        <Link href={"/form"}>
          <Text size={"4"} weight={"medium"}>
            Submit Complaint
          </Text>
        </Link>
        <button className="uppercase rounded-3xl text-xl px-7 bg-purple-700 py-1">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
