import { ChessBoard } from "@/app/components/ChessBoard";
import { ConfigurationPanel } from "@/app/components/ConfigurationPanel";
export default function Home() {
  return (
    <main className="flex flex-col items-center sm:flex-row justify-evenly">
      <ChessBoard />
      <ConfigurationPanel />
    </main>
  );
}
