import Link from "next/link";
import { Icon } from "./_icon";

export const metadata = {
  title: "The Technical Map | Experiments",
};

export default function FamilyBrowserIconPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <main className="w-[900px] aspect-square space-y-8">
        <header className="text-gray11">
          <h1 className="font-serif text-2xl">
            <Link href="/">TTM</Link>
          </h1>
        </header>
        <Icon />
      </main>
    </div>
  );
}
