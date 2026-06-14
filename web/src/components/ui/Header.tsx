// import { fetchCategories } from '@/services/category.service';
// import type { Category } from '@/utils/types';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router';

import { useState, useEffect } from 'react';
// import { Link } from 'react-router';
// import UserButton from './UserButton';
import Logo from './Logo';
import { Show, SignInButton, UserButton } from '@clerk/react';
import { CircleUser, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router';

const Header = () => {
  // const query = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: fetchCategories,
  // });

  // console.log(query.data);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const menuData = [
    {
      title: 'Courses',
      submenu: [
        { title: 'Official Courses', path: '/courses' },
        { title: 'AI Courses', path: '/ai/course' },
        { title: 'Community Courses', path: '/community' },
      ],
    },
    {
      title: 'Resources',
      path: '/resources',
    },
    {
      title: 'Guides',
      path: '/guides',
    },
    {
      title: 'Pricing',
      path: '/pricing',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* <ul>
        {query.data?.map((category: Category) => <li key={category.id}>
          <Link to={`/courses/?category=${category.slug}`}>{category.name}</Link>
        </li>)}
      </ul> */}
      <header
        className={`sticky top-0 z-40 w-full text-white transition-all duration-300 ${
          isScrolled
            ? 'bg-white/60 dark:bg-black/40 backdrop-blur'
            : 'bg-transparent'
        }`}
      >
        {/* NAVBAR */}
        <nav className="mx-auto flex w-full max-w-7xl items-center px-6 py-3 md:px-10 lg:px-16 xl:px-24">
          <div className="flex flex-1 items-center justify-start">
            <Logo />
          </div>

          <div className="hidden flex-1 items-center justify-center gap-8 text-sm md:flex">
            {menuData.map((item) =>
              item.submenu ? (
                <div key={item.title} className="relative group">
                  <button className="flex items-center gap-1.5 text-sm hover:text-slate-300 transition cursor-pointer border-0 py-2">
                    {item.title}
                    <svg
                      className="transition-transform group-hover:rotate-180"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m1 1 4 4 4-4"
                        stroke="#71717b"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-zinc-200 rounded-xl shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.title}
                        href={sub.path}
                        className="block px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
                      >
                        {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.title}
                  href={item.path}
                  className="hover:text-slate-300 transition"
                >
                  {item.title}
                </a>
              ),
            )}
          </div>

          <div className="flex flex-1 items-center justify-end space-x-3 md:space-x-0">
            <Show when="signed-out">
              <SignInButton
                fallbackRedirectUrl="/dashboard"
                forceRedirectUrl="/dashboard"
              >
                <button className="cursor-pointer">
                  <CircleUser size={24} />
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton
                appearance={{
                  elements: {
                    userButtonTrigger: 'shadow-none',
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My courses"
                    labelIcon={<Ticket size={16} />}
                    onClick={() => navigate('/tickets')}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </Show>

            <button
              id="open-menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-white transition active:scale-90 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="fixed z-50 inset-0 bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-10 md:hidden transition-transform duration-300">
          {menuData.map((item) =>
            item.submenu ? (
              <div
                key={item.title}
                className="w-full flex flex-col items-center gap-0"
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {item.title}
                  <svg
                    className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m1 1 4 4 4-4"
                      stroke="#71717b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="flex flex-col gap-2 w-full max-w-xs px-4 mt-4">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.title}
                        href={sub.path}
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm text-white/90 bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        {sub.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.title}
                href={item.path}
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </a>
            ),
          )}

          <button
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </nav>
      )}
    </>
  );
};

export default Header;
