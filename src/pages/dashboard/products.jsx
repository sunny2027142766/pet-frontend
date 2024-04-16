import { Helmet } from "react-helmet-async";

import { ProductsView } from "src/sections/dashboard/products/view";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> 产品管理 | Minimal UI </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
