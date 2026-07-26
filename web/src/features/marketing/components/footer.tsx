import { Link } from "react-router";
import Logo from "./logo";
import Subscribe from "./subscribe";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-auto w-full shrink-0 border-t border-border/40 bg-background/95 text-foreground backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Responsive Grid: 1 cột trên dọc (Portrait), 2 cột trên ngang (Landscape), 12 cột trên tablet/desktop */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12 lg:gap-12 pb-8 sm:pb-10 border-b border-border/60">
          
          {/* Brand Info Section */}
          <div className="space-y-4 sm:col-span-2 md:col-span-5 lg:col-span-5">
            <Logo />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Community created courses, best practices, articles, resources and
              journeys to help you choose your path and grow in your career.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {/* Dribbble */}
              <a
                href="https://dribbble.com/prebuiltui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dribbble"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-muted/30 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                  <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                  <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/prebuiltui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-muted/30 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com/prebuiltui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-muted/30 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@prebuiltui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-muted/30 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 sm:col-span-1 md:col-span-3 lg:col-span-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Get in touch
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+840708607525"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-foreground active:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 text-primary shrink-0"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+84-0708-607-525</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:zin.it.dev@gmail.com"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-foreground active:text-primary break-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 text-primary shrink-0"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>zin.it.dev@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Newsletter Section */}
          <div className="space-y-4 sm:col-span-1 md:col-span-4 lg:col-span-4">
            <Subscribe />
          </div>

        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            Copyright {currentYear} &copy;{" "}
            <Link
              to="https://github.com/lhzinh/edemy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline hover:text-primary"
            >
              Edemy 🎓
            </Link>
            . All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy" className="hover:text-foreground transition-colors py-1">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-border">•</span>
            <Link to="/terms" className="hover:text-foreground transition-colors py-1">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}