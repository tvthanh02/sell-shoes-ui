import { Header, Footer, ScrollToTop } from "@/components";
const Default = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="my-10">{children}</main>
      <Footer />
    </>
  );
};

export default Default;
