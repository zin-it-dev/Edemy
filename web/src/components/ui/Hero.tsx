import { useState } from 'react';
import { Link } from 'react-router';
import heroBg from '@/assets/images/hero.png';
import Trusted from './Trusted';

const Hero = () => {
  const [input, setInput] = useState('');

  const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
      {/* BACKGROUND IMAGE */}
      <img
        src={heroBg}
        className="absolute inset-0 -z-10 size-full opacity"
        alt=""
      />

      <Link
        to={'/'}
        className="flex flex-wrap items-center justify-center gap-2 border border-slate-700 rounded-full px-4 py-2 text-sm mt-20"
      >
        <div className="relative flex size-3.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
          <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
        </div>
        <p className="flex items-center gap-2">
          <span>AI-Powered Courses Generator</span>
          <svg
            className="mt-px"
            width="6"
            height="9"
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 1 4 3.5L1 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
      </Link>

      <h1 className="text-center text-4xl lg:text-5xl leading-12 md:text-6xl md:leading-17.5 mt-4 font-semibold max-w-3xl px-4">
        Design, Build & Launch Courses with{' '}
        <span className="font-bold bg-linear-to-r from-indigo-500 via-violet-500 to-pink-400 bg-clip-text text-transparent">
          AI-Powered
        </span>{' '}
        in Minutes
      </h1>

      <p className="text-center text-base max-w-2xl mt-3 px-4 text-slate-200">
        Our platform helps you build, test, and deliver learn faster — so you
        can focus on what matters.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white/10 max-w-2xl w-full rounded-xl p-4 mt-10 border border-indigo-600/70 focus-within:ring-2 ring-indigo-500 transition-all"
      >
        <textarea
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none text-gray-300 resize-none w-full"
          rows={4}
          placeholder="Describe your course topic, audience, goals, and preferred style..."
          value={input}
          required
        />
        <button className="ml-auto flex items-center gap-2 bg-linear-to-r from-[#CB52D4] to-indigo-600 rounded-md px-4 py-2 font-medium">
          Generate
        </button>
      </form>

      <Trusted />
    </section>
  );
};

export default Hero;
