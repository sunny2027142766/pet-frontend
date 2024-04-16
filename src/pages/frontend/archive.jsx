import { Helmet } from "react-helmet-async";

import { ArchiveView } from "src/sections/frontend/archive/view";

// ----------------------------------------------------------------------

export default function ArchivePage() {
  return (
    <>
      <Helmet>
        <title> 宠物档案馆 | 虚拟宠物互动平台 </title>
      </Helmet>

      <ArchiveView />
    </>
  );
}
