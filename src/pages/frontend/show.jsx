import { Helmet } from "react-helmet-async";

import { ShowView } from "src/sections/frontend/show/view";

// ----------------------------------------------------------------------

export default function ShowPage() {
  return (
    <>
      <Helmet>
        <title> 宠物展示 | 虚拟宠物互动平台 </title>
      </Helmet>

      <ShowView />
    </>
  );
}
