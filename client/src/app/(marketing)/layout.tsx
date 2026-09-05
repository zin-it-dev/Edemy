import Header from "@/components/features/marketing/header"
import Footer from "@/components/features/marketing/footer"

export default function MarketingLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
