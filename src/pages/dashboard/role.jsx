import { Helmet } from "react-helmet-async";

import { RoleView } from "src/sections/dashboard/role/view";

// ----------------------------------------------------------------------

export default function RolePage() {
  return (
    <>
      <Helmet>
        <title> 角色管理 | 虚拟宠物互动平台 </title>
      </Helmet>

      <RoleView />
    </>
  );
}
