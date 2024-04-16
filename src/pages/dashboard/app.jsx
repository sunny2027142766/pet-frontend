import { Helmet } from "react-helmet-async";

import { AppView } from "src/sections/dashboard/overview/view";

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> 控制台 | 虚拟宠物互动平台 </title>
      </Helmet>

      <AppView />
    </>
  );
}
