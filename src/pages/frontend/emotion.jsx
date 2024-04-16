import { Helmet } from "react-helmet-async";

import { EmotionView } from "src/sections/frontend/emotion/view";

// ----------------------------------------------------------------------

export default function EmotionPage() {
  return (
    <>
      <Helmet>
        <title> 情感互动 | 虚拟宠物互动平台 </title>
      </Helmet>

      <EmotionView />
    </>
  );
}
