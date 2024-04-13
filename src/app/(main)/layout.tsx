import Navbar from "./_components/nav-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <div className="flex flex-col">
        <Navbar />
        <main>{children}</main>
      </div>

  );
}
