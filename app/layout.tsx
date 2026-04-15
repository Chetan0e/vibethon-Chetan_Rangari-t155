import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
