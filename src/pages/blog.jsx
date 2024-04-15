import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> 社区管理 | 虚拟宠物互动平台 </title>
      </Helmet>

      <BlogView />
    </>
  );
}
