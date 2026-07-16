import { useState } from 'react';
import Background from './background';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqsData = [
    {
      question: 'Lightning-Fast Performance',
      answer: 'Built with speed — minimal load times and optimized rendering.',
    },
    {
      question: 'Fully Customizable Components',
      answer:
        'Easily adjust styles, structure, and behavior to match your project needs.',
    },
    {
      question: 'Responsive by Default',
      answer:
        'Every component are responsive by default — no extra CSS required.',
    },
    {
      question: 'Tailwind CSS Powered',
      answer:
        'Built using Tailwind utility classes — no extra CSS or frameworks required.',
    },
    {
      question: 'Dark Mode Support',
      answer:
        'All components come ready with light and dark theme support out of the box.',
    },
  ];
  return (
    <div className="relative flex flex-col items-center text-center text-slate-800 px-3 py-20 min-h-screen">
      <Background />
      <p className="text-base font-medium text-white">FAQs</p>
      <h1 className="text-3xl md:text-4xl text-white font-semibold mt-2">
        Frequently Asked Questions
      </h1>
      <p className="text-sm text-slate-300 mt-4 max-w-sm">
        Proactively answering FAQs boosts user confidence and cuts down on
        support tickets.
      </p>
      <div className="max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left">
        {faqsData.map((faq, index) => (
          <div key={index} className="flex flex-col items-start w-full">
            <div
              className="flex items-center justify-between w-full cursor-pointer bg-white/10 backdrop-blur border border-white/20 p-4 rounded hover:bg-white/20 transition-all"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h2 className="text-sm text-white">{faq.question}</h2>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${openIndex === index ? 'rotate-180' : ''} transition-all duration-500 ease-in-out`}
              >
                <path
                  d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className={`text-sm text-slate-300 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? 'opacity-100 max-h-75 translate-y-0 pt-4' : 'opacity-0 max-h-0 -translate-y-2'}`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;