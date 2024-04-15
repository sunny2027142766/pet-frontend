import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>登录页面 | 虚拟宠物互动平台</title>
      </Helmet>

      <LoginView />
    </>
  );
}
