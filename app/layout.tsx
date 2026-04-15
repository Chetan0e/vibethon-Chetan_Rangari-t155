import "./globals.css";
import NeuralBackground from "@/components/NeuralBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
        <NeuralBackground intensity={0.15} />
        {children}
      </body>
    </html>
  );
}
