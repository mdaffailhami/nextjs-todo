export function Hero() {
  return (
    <div className="bg-secondary border-b bg-[url('/hero-bg.png')] bg-cover">
      <div className="size-full bg-black/30 py-40">
        <div className="mx-auto max-w-130 px-3 text-center text-white">
          <h1>NextJS - E-commerce</h1>
          <p className="mt-4">
            Welcome to our e-commerce app, your one-stop shop for all your
            needs. Discover a wide range of products with the best deals.
          </p>
        </div>
      </div>
    </div>
  );
}
