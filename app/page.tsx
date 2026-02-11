import Carousel from "@/components/Carousel";

export default function Home() {
  const items = [
    <div key="1">
      <p className="text-lg">“Fast, clean, professional.”</p>
      <p className="opacity-70 mt-2">— Client A</p>
    </div>,
    <div key="2">
      <p className="text-lg">“Deployed perfectly on Vercel.”</p>
      <p className="opacity-70 mt-2">— Client B</p>
    </div>,
    <div key="3">
      <p className="text-lg">“Mobile feels great.”</p>
      <p className="opacity-70 mt-2">— Client C</p>
    </div>,
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-8">
      <h1 className="text-4xl font-bold">Ben Shalem 🚀</h1>

      {/* 👇 insert it here */}
      <div className="w-full max-w-5xl">
        <Carousel items={items} />
      </div>
    </main>
  );
}
