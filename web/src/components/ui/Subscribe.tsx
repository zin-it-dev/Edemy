const Subscribe = () => {
  return (
    <form>
      <p className="text-sm md:text-base mb-5">
        Join our newsletter for regular updates.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="email"
          placeholder="Enter your email..."
          className="bg-[#14171A] text-white border border-white/10 px-3 py-3 rounded-md w-full sm:flex-1 sm:max-w-xs placeholder:text-sm placeholder:font-light focus:outline-none focus:ring-1 focus:ring-gray-600"
        />
        <button className="bg-[#14171A] text-white px-5 py-3 rounded-md border border-white/10 text-sm hover:bg-gray-800 transition-colors">
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default Subscribe;
