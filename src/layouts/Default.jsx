import { Header, Footer, ScrollToTop } from "@/components";
const Default = ({ chidldren }) => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="my-10">{chidldren}</main>
      <Footer />
    </>
  );
};

export default Default;
