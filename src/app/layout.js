import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Link from "next/link";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handcrafted goods made with love by skilled artisans around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <footer className="bg-primary text-primary-foreground py-12 mt-16">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Handcrafted Haven</h3>
              <p className="text-sm opacity-80">A marketplace for unique handmade goods, connecting skilled artisans with people who appreciate quality craftsmanship.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Shop</h4>
              <ul className="space-y-1 text-sm opacity-80">
                <li><Link href="/category/pottery" className="hover:opacity-100">Pottery & Ceramics</Link></li>
                <li><Link href="/category/jewelry" className="hover:opacity-100">Jewelry</Link></li>
                <li><Link href="/category/textiles" className="hover:opacity-100">Textiles</Link></li>
                <li><Link href="/category/woodcraft" className="hover:opacity-100">Woodcraft</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">About</h4>
              <ul className="space-y-1 text-sm opacity-80">
                <li><Link href="#" className="hover:opacity-100">Our Story</Link></li>
                <li><Link href="#" className="hover:opacity-100">Become a Seller</Link></li>
                <li><Link href="#" className="hover:opacity-100">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-60">
            © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
