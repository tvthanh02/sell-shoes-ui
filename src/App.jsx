import { RouterProvider } from "react-router-dom";
import router from "../routes";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
};

export default App;
