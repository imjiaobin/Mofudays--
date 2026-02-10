<<<<<<< HEAD
export default function FrontEndLayout(){
    return (
        <h2>前台頁面 layout</h2>
    )
}
=======
import { Outlet } from "react-router-dom";

function FrontEndLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default FrontEndLayout;
>>>>>>> feature/james
