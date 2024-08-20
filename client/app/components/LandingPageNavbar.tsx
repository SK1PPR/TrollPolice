import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

function LandingPageNavbar() {
  return (
    <div className="w-screen flex items-center justify-between shadow-xl ring-1 ring-black/5 bg-black/10 sticky top-0 bg-gradient-to-br from-violet-950 via-violet-700 to-violet-900">
      <Link href={"/"}>
        <div className="flex items-center p-8 gap-2">
          <Image src={"/cyber-security.png"} width={40} height={40} alt="icon" />
          <Heading as="h1" size={"7"} weight={"medium"}>
            Troll Police
          </Heading>
        </div>
      </Link>

      <div className="flex items-center gap-9 p-8 uppercase">
        <Link href={"/"}>
          <Text size={"4"} weight={"medium"}>
            Home
          </Text>
        </Link>
        <Link href={"/regulations"}>
          <Text size={"4"} weight={"medium"}>
            Regulations
          </Text>
        </Link>
        <Text size={"4"} weight={"medium"}>
          About
        </Text>
        <button className="uppercase rounded-3xl text-xl px-7 bg-purple-700 py-1">Sign In</button>
      </div>
    </div>
  );
}

export default LandingPageNavbar;
