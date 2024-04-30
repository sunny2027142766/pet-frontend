import { Helmet } from "react-helmet-async";

import { SettingsView } from "src/sections/settings";

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> 设置 | 虚拟宠物互动平台 </title>
      </Helmet>

      <SettingsView />
    </>
  );
}
