import styles from './page.module.css';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-8">
      {/* Example using your CSS Module */}
      <h1 className={styles.title}>Hello World</h1>

      {/* Example using Tailwind classes */}
      <h1 className="text-4xl font-bold">Ben Shalem 🚀</h1>

      <div className="w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-6">
        <p className="text-sm opacity-70 mb-4">Testimonials</p>
        {/* Carousel removed */}
      </div>
    </main>
  );
}