export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600">✂️ Sniplink</h1>
          <p className="text-gray-500 text-sm mt-1">Shorten. Share. Track.</p>
        </div>
        {children}
      </div>
    </main>
  );
}
