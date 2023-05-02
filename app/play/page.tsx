import { ChessBoard } from '@/views/ChessBoard';
import { ConfigurationPanel } from '@/views/ConfigurationPanel';
export default function Play() {
  return (
    <main className="flex flex-col items-center sm:flex-row justify-evenly">
      <ChessBoard />
      <ConfigurationPanel />
    </main>
  );
}
