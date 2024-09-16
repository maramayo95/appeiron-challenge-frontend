import type { ReactNode } from "react";

const GridCards = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center mt-10">
    <section className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
      {children}
    </section>
    </div>
  );
};

export default GridCards;
