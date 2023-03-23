import { ChessBoard } from '@/app/views/ChessBoard';
import { ConfigurationPanel } from '@/app/views/ConfigurationPanel';
export default function Home() {
  return (
    <main className="flex flex-col items-center sm:flex-row justify-evenly">
      <ChessBoard />
      <ConfigurationPanel />
    </main>
  );
}
