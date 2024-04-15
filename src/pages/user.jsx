import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> 用户管理 | 虚拟宠物互动平台 </title>
      </Helmet>

      <UserView />
    </>
  );
}
