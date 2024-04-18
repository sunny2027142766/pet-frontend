import { Helmet } from "react-helmet-async";

import { InfoView } from "src/sections/dashboard/info/view";

// ----------------------------------------------------------------------

export default function InfoPage() {
  return (
    <>
      <Helmet>
        <title> 档案管理 | 虚拟宠物互动平台 </title>
      </Helmet>

      <InfoView />
    </>
  );
}
