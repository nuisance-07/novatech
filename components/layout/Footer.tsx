import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            NovaTech
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Pioneering the future of commerce with curated technology for the modern visionary.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-400 hover:text-primary transition">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition">
                                <Github size={20} />
                            </Link>
                        </div>

                        <div className="pt-6">
                            <h4 className="font-bold text-white mb-4">Stay Updated</h4>
                            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest tech drops.</p>
                            <NewsletterForm />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Explore</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/shop" className="hover:text-primary transition">Shop All</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
                            <li><Link href="/shop?category=laptops" className="hover:text-primary transition">Laptops</Link></li>
                            <li><Link href="/shop?category=phones" className="hover:text-primary transition">Smartphones</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Support</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-primary transition">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-primary transition">Order Status</Link></li>
                            <li><Link href="#" className="hover:text-primary transition">Returns</Link></li>
                            <li><Link href="#" className="hover:text-primary transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-primary" />
                                <span>123 Tech Boulevard, Silicon Valley, CA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-primary" />
                                <span>support@novatech.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} NovaTech. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
