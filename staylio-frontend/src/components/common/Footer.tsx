import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const categories = ["First Link", "Second Link", "Third Link", "Fourth Link"];
  const socialIcons = [
    {
      href: "/",
      svg: (
        <svg
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      href: "/",
      svg: (
        <svg
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
    {
      href: "/",
      svg: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
        </svg>
      ),
    },
    {
      href: "/",
      svg: (
        <svg
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="text-muted-foreground bg-secondary body-font">
      <div className="max-w-[96rem] w-full p-4 md:p-16 mx-auto flex flex-wrap md:flex-nowrap flex-col md:flex-row">
        {/* Logo Section */}
        <div className="w-64 flex-shrink-0 mx-auto md:mx-0 text-center md:text-left">
          <Link
            href="/"
            className="flex title-font font-medium gap-2 items-center justify-center md:justify-start"
          >
            <Home className="stroke-red-500 shrink-0" />
            <h1 className="text-2xl font-bold text-red-500">Staylio</h1>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            {/* Air plant banjo lyft occupy retro adaptogen indego */}
          </p>
        </div>

        {/* Category Sections */}
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 text-center md:text-left">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-accent-foreground tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                {categories.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href="/"
                      className="text-muted-foreground hover:text-accent-foreground"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            © 2025 Staylio
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {socialIcons.map((icon, idx) => (
              <Link
                href={icon.href}
                key={idx}
                className="text-muted-foreground ml-3 first:ml-0"
              >
                {icon.svg}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
