import Header from "@/components/shared/header";

export default function MarketingLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <span className="text-xl">🎓</span>
            <span>Edemy</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Edemy. Learn without limits.</p>
        </div>
      </footer>
    </>
  );
}
