import { Heart } from 'lucide-react';

const OfficialCourses = () => {
  const products = [
    {
      image:
        'https://assets.prebuiltui.com/images/components/card/card-lamp-image.png',
      name: 'Cylindrical Modern Table Lamp',
      price: '$29.00',
      oldPrice: '$59.00',
    },
    {
      image:
        'https://assets.prebuiltui.com/images/components/card/card-watch-image.png',
      name: 'Modern Smart Watch for Men/women',
      price: '$48.00',
      oldPrice: '$59.00',
    },
    {
      image:
        'https://assets.prebuiltui.com/images/components/card/card-bag-image.png',
      name: 'Luxury and modern ladies bag',
      price: '$24.00',
      oldPrice: '$59.00',
    },
    {
      image:
        'https://assets.prebuiltui.com/images/components/card/card-speaker-image.png',
      name: 'Modern Smart AI Speaker',
      price: '$29.00',
      oldPrice: '$59.00',
    },
  ];

  return (
    <>
      <div className="flex items-center border pl-4 gap-2 border-gray-500/30 h-11.5 rounded-full overflow-hidden max-w-md w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 30 30"
          fill="#6B7280"
        >
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full outline-none text-gray-500 bg-transparent placeholder-gray-500 text-sm"
        />
      </div>

      <section className="bg-linear-to-b from-[#020204] to-[#191130] flex items-center justify-center px-4 py-16">
        <div className="flex flex-wrap items-stretch justify-center gap-5">
          {products.map((item, index) => (
            <div
              key={index}
              className="border border-zinc-200 hover:border-zinc-300 transition-colors rounded-xl p-2 flex flex-col w-46"
            >
              {/* Top row: badge + bookmark */}
              <div className="flex items-center justify-between mb-2">
                <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-pink-400 text-amber-50 text-xs px-2 py-0.5 rounded-full">
                  <span className="font-bold">20%</span> off
                </span>
                <button
                  onClick={() => alert('Hello')}
                  className="size-7 rounded-full border border-zinc-300 flex items-center justify-center cursor-pointer"
                >
                  <Heart size={16} className="text-fuchsia-300" />
                </button>
              </div>

              {/* Product Image */}
              <div className="flex items-center justify-center h-30 mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Product Name */}
              <p className="text-sm text-neutral-300 mb-2 px-2">{item.name}</p>

              {/* Price */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold bg-linear-to-r from-rose-500 to-emerald-400 bg-clip-text text-transparent">
                  {item.price}
                </span>
                <span className="text-xs text-red-500 line-through">
                  {item.oldPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section></section>
    </>
  );
};

export default OfficialCourses;
