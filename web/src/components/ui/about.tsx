const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 pb-20">
      <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
        <img
          className="max-w-md w-full object-cover rounded-2xl"
          src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
          alt=""
        />
        <div className="gap-1 max-w-72 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white size-16 flex items-center justify-center aspect-square backdrop-blur rounded-full">
          <svg
            width="15"
            height="18"
            viewBox="0 0 15 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.027 3.371c0-1.374 1.512-2.213 2.678-1.484l9.11 5.693a1.75 1.75 0 0 1 0 2.969l-9.11 5.693c-1.166.729-2.678-.11-2.678-1.484z"
              fill="#fff"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="text-sm text-slate-600 max-w-lg">
        <h1 className="text-xl uppercase font-semibold text-slate-700">
          What we do?
        </h1>
        <div className="w-24 h-0.75 rounded-full bg-linear-to-r from-indigo-600 to-[#DDD9FF]"></div>
        <p className="mt-8">
          PrebuiltUI helps you build faster by transforming your design vision
          into fully functional, production-ready UI components.{' '}
        </p>
        <p className="mt-4">
          Whether you're launching a SaaS app, landing page or dashboard, our
          collection of Tailwind CSS components is crafted to boost your
          development speed and improve user experience.
        </p>
        <p className="mt-4">
          From UI design systems to automation-ready layouts, PrebuiltUI
          empowers you to build beautifully and scale effortlessly.
        </p>
        <a
          href="#"
          className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-linear-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white"
        >
          <span>Read more</span>
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
              fill="#fff"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default About;
