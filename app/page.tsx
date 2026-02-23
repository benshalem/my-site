import styles from './page.module.css';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-8">
      <h1 className={styles.title}>Hello World</h1>

      <h1 className="text-4xl font-bold">Ben Shalem 🚀</h1>

      {/* YouTube Video - Responsive */}
      <div className="w-full max-w-3xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/ogRMIxHsKAI"
            title="Ben Shalem Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-6">
        <p className="text-sm opacity-70 mb-4">Testimonials</p>
      </div>
    </main>
  );
}