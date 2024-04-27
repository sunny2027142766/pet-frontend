import { Helmet } from 'react-helmet-async';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NoAuthPage() {
  return (
    <>
      <Helmet>
        <title> 您暂时没有权限，请先联系管理员给予权限 </title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
