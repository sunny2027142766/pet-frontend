import { Helmet } from "react-helmet-async";

import { HomeView } from "src/sections/frontend/home/view";

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> 首页 | 虚拟宠物互动平台 </title>
      </Helmet>

      <HomeView />
    </>
  );
}
