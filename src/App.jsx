import { RouterProvider } from "react-router";
import { router } from "./router";
import { AuthProvider } from "./contexts/AuthContext";

// export default App;

import Petinfo from "./pages/FrontEndLayout/PetInfo/PetInfo.jsx";
import Plan from "./pages/FrontEndLayout/Plan/Plan.jsx";
import Cart from "./pages/FrontEndLayout/Cart/Cart.jsx";
import Checkout from "./pages/FrontEndLayout/Checkout/Checkout.jsx";
import Finish from "./pages/FrontEndLayout/Finish/Finish.jsx";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
