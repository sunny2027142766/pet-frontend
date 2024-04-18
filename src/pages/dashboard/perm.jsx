import { Helmet } from "react-helmet-async";

import { PermView } from "src/sections/dashboard/perm/view";

// ----------------------------------------------------------------------

export default function PermPage() {
  return (
    <>
      <Helmet>
        <title> 角色管理 | 虚拟宠物互动平台 </title>
      </Helmet>

      <PermView />
    </>
  );
}
