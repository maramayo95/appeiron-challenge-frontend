import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-10 dark:bg-gray-900 bg-gray-50 py-6 text-slate-50">
      <Container classNames="flex justify-center items-center">
        <p className="text-base lg:text-lg">
          Copyright &copy; {new Date().getFullYear()} Matias Aramayo | All rights
          reserved
        </p>
      </Container>
    </footer>
  );
};
export default Footer;