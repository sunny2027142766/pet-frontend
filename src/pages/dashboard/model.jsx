import { Helmet } from "react-helmet-async";

import { ModelView } from "src/sections/dashboard/model/view";

// ----------------------------------------------------------------------

export default function ModelPage() {
  return (
    <>
      <Helmet>
        <title> 3D模型管理 | 虚拟宠物互动平台 </title>
      </Helmet>

      <ModelView />
    </>
  );
}
