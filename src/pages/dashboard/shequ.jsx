import { Helmet } from "react-helmet-async";

import { ShequView } from "src/sections/dashboard/shequ/view";

// ----------------------------------------------------------------------

export default function ShequPage() {
  return (
    <>
      <Helmet>
        <title> 社区管理 | 虚拟宠物互动平台 </title>
      </Helmet>

      <ShequView />
    </>
  );
}
