import { useState } from 'react';

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 px-3 md:px-14 py-2.5 md:py-3 font-medium text-xs md:text-sm text-white bg-linear-to-r from-[#4F39F6] to-[#E0724A]">
      <p className="order-2 md:order-1 text-center md:text-left">
        <span className="px-2 md:px-3 py-1 rounded-md text-indigo-600 bg-white mr-1 md:mr-2 inline-block">
          Launch offer
        </span>
        <span className="hidden md:inline">
          Try Edemy 🎓 today and get $50 free credits
        </span>
        <span className="md:hidden">Get $50 free credits</span>
      </p>
      <div className="order-1 md:order-2 flex items-center gap-2 md:space-x-6">
        <button
          type="button"
          className="cursor-pointer font-normal text-xs md:text-sm text-gray-800 bg-white px-4 md:px-7 py-1.5 md:py-2 rounded-full hover:bg-gray-100 transition whitespace-nowrap"
        >
          Claim Offer
        </button>
        <button
          type="button"
          className="cursor-pointer p-1 hover:opacity-80 transition"
          onClick={handleClose}
          aria-label="Close banner"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="12.532"
              width="17.498"
              height="2.1"
              rx="1.05"
              transform="rotate(-45.74 0 12.532)"
              fill="#fff"
            />
            <rect
              x="12.533"
              y="13.915"
              width="17.498"
              height="2.1"
              rx="1.05"
              transform="rotate(-135.74 12.533 13.915)"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
