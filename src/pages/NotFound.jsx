export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Not Found.
      </p>
      <a
        href="/"
        className="cosmic-button"
      >
        Go Home
      </a>
    </div>
  );
};
