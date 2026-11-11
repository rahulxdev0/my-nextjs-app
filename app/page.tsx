import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome to Electron + Next.js</h1>
      <p>Platform: {typeof window !== 'undefined' && (window as any).electronAPI?.platform}</p>
      <button>Ping Electron</button>
    </div>
  );
}
