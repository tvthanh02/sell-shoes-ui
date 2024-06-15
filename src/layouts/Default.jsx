import { Header, Footer } from "@/components";
const Default = ({ chidldren }) => {
  return (
    <>
      <Header />
      <main className="my-10">{chidldren}</main>
      <Footer />
    </>
  );
};

export default Default;
