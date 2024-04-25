import { Helmet } from "react-helmet-async";

import { PostDetailView } from "src/sections/frontend/community/detail";

// ----------------------------------------------------------------------

export default function PostDetailPage() {
  return (
    <>
      <Helmet>
        <title> 帖子详情 | 虚拟宠物互动平台 </title>
      </Helmet>

      <PostDetailView />
    </>
  );
}
