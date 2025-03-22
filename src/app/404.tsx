import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">Sorry, we couldn't find the page you're looking for.
      </h1>
      <Link href="/">
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
