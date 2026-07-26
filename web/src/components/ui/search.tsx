import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";

interface SearchProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Search = ({ 
  onSearch, 
  placeholder = "Search courses, lessons...",
  className = "" 
}: SearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(e.target as Node) && 
        !query
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, query]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    onSearch?.("");
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative flex items-center justify-end ${className}`}
    >
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpen}
          className="size-9 rounded-xl hover:bg-muted/80 transition-transform active:scale-95"
          aria-label="Open search"
        >
          <SearchIcon className="size-4 text-muted-foreground" />
          <span className="sr-only">Search</span>
        </Button>
      )}

      <div
        className={`
          flex items-center overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen 
            ? "w-64 sm:w-80 opacity-100 scale-100" 
            : "w-0 opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="relative flex items-center w-full">
          <SearchIcon className="absolute left-3 size-4 text-muted-foreground pointer-events-none shrink-0" />

          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder={placeholder}
            className="h-9 w-full pl-9 pr-16 text-xs sm:text-sm bg-muted/50 focus-visible:bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-ring rounded-xl transition-all shadow-sm"
          />

          <div className="absolute right-1.5 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full hover:bg-muted-foreground/20 text-muted-foreground transition-colors"
                title="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-muted-foreground/20 text-muted-foreground transition-colors"
              title="Close search (Esc)"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;