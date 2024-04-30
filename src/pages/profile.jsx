import { Helmet } from "react-helmet-async";

import { ProfileView } from "src/sections/profile";

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> 个人信息 | 虚拟宠物互动平台 </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
