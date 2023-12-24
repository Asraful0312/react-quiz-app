import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className="bg-slate-100 dark:bg-slate-800">
        <div className="container mx-auto py-10">{children}</div>
      </main>
    </>
  );
}
