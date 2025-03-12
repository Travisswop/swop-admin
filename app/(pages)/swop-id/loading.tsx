import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<p className="text-black">Loading swop.id...</p>}>
      {children}
    </Suspense>
  );
};

export default Layout;
