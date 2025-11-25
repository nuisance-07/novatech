import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-4">
            <h2 className="text-4xl font-bold mb-4 text-primary">404 - Page Not Found</h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors font-medium"
            >
                Return Home
            </Link>
        </div>
    );
}
