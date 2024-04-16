import { Helmet } from "react-helmet-async";

import { CommunityView } from "src/sections/frontend/community/view";

// ----------------------------------------------------------------------

export default function CommunityPage() {
  return (
    <>
      <Helmet>
        <title> 宠物社区 | 虚拟宠物互动平台 </title>
      </Helmet>

      <CommunityView />
    </>
  );
}
