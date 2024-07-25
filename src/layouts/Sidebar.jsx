import { Header, Footer } from "@/components";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container flex gap-5 py-5">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3/1 gap-4">
          <main className="w-full">{children}</main>
          <aside className="w-full flex flex-col gap-5">
            <div className="border border-gray border-solid w-full h-[300px] bg-[#ededed]"></div>
            <div className="border border-gray border-solid w-full h-[300px] bg-[#ededed]"></div>
            <div className="border border-gray border-solid w-full h-[300px] bg-[#ededed]"></div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sidebar;
