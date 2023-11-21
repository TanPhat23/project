import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const links = [
  {
    label: "Course",
    href: "/course",
  },
  {
    label: "ChatGPT",
    href: "/ChatGPT",
  },
];
const Navbar = () => {
  return (
    <div className="flex w-full p-4 font-bold">
      <div className="flex justify-evenly w-40 ">
        <Link href="/" className="flex justify-between w-32">
          <Image src="/logo2.png" alt="LOGO" width={35} height={40} />
          <h1 className="hover:opacity-10">IT-LEARN</h1>
        </Link>
      </div>
      <div className="flex justify-evenly w-2/12">
        {links.map((link) => (
          <Link className="hover:opacity-10" key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
