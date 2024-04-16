import { Helmet } from "react-helmet-async";

import { PostAddView } from "src/sections/frontend/community/add";

// ----------------------------------------------------------------------

export default function PostAddPage() {
  return (
    <>
      <Helmet>
        <title> 发表帖子 | 虚拟宠物互动平台 </title>
      </Helmet>

      <PostAddView />
    </>
  );
}
