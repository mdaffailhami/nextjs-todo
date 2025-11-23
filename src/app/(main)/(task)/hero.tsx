export function Hero() {
  return (
    <div className="bg-secondary border-b bg-[url('/hero-bg.png')] bg-cover bg-fixed">
      <div className="size-full bg-black/30 py-12">
        <div className="mx-auto max-w-130 px-4 text-center text-white">
          <h1>NextJS Todo</h1>
          <p className="mt-4">
            Welcome to NextJS Todo, your ultimate task management solution built
            with Next.js.
          </p>
        </div>
      </div>
    </div>
  );
}
