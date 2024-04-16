import { Helmet } from "react-helmet-async";

import { InteractionView } from "src/sections/frontend/interaction/view";

// ----------------------------------------------------------------------

export default function InteractionPage() {
  return (
    <>
      <Helmet>
        <title> 宠物互动 | 虚拟宠物互动平台 </title>
      </Helmet>

      <InteractionView />
    </>
  );
}
