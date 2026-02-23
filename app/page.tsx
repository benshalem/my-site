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

      {/* Image Carousel (5 Images with thin white borders) */}
      <div className="w-full max-w-3xl">
        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory hide-scrollbar py-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex-shrink-0 w-64 h-64 snap-center">
              {/* Replace the src with your actual image paths like "/my-image-1.jpg" */}
              <img
                src={`https://picsum.photos/seed/${item + 20}/400/400`}
                alt={`Carousel image ${item}`}
                className="w-full h-full object-cover rounded-xl border border-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-6">
        <p className="text-sm opacity-70 mb-4">Testimonials</p>
      </div>
    </main>
  );
}