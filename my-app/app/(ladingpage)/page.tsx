import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="">
      <Link href="/sign-in">
        <Button>SignIn</Button>
      </Link>
    </div>
  );
}
