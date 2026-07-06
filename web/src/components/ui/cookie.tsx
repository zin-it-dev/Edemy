export default function Cookie() {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-96 flex flex-col items-center bg-white text-gray-500 text-center p-4 md:p-6 rounded-lg border border-gray-500/30 text-sm md:text-base shadow-lg z-40">
      <img
        className="w-12 md:w-14 h-12 md:h-14"
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/cookies/cookieImage1.svg"
        alt="cookieImage1"
      />
      <h2 className="text-gray-800 text-lg md:text-xl font-medium pb-2 md:pb-3 mt-2">
        We care about your privacy
      </h2>
      <p className="w-full md:w-11/12 text-xs md:text-sm">
        This website uses cookies for functionality, analytics, and marketing.
        By accepting, you agree to our{' '}
        <a
          href="#"
          className="font-medium underline hover:text-indigo-600 transition"
        >
          Cookie Policy
        </a>
        .
      </p>
      <div className="flex items-center justify-center mt-4 md:mt-6 gap-2 md:gap-4 w-full">
        <button
          type="button"
          className="font-medium px-4 md:px-8 py-1.5 md:py-2 border border-gray-500/30 rounded hover:bg-blue-500/10 active:scale-95 transition text-xs md:text-sm"
        >
          Decline
        </button>
        <button
          type="button"
          className="bg-indigo-600 px-4 md:px-8 py-1.5 md:py-2 rounded text-white font-medium active:scale-95 transition text-xs md:text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
