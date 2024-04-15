import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>注册页面 | 虚拟宠物互动平台</title>
      </Helmet>

      <RegisterView />
    </>
  );
}
