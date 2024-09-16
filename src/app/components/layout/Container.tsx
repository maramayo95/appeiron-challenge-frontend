import type { ReactNode } from "react";

const Container = ({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames?: string;
}) => {
  return (
    <section className={`mx-auto w-full max-w-7xl px-4 ${classNames}`}>
      {children}
    </section>
  );
};

export default Container;