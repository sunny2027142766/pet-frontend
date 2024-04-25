import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import FrontEndLayout from "src/layouts/frontend";
import DashboardLayout from "src/layouts/dashboard";
import RequireAuth from "./auth/require-auth";

// dashboard
export const IndexPage = lazy(() => import("src/pages/dashboard/app"));
export const BlogPage = lazy(() => import("src/pages/dashboard/blog"));
export const UserPage = lazy(() => import("src/pages/dashboard/user"));
export const RolePage = lazy(() => import("src/pages/dashboard/role"));
export const PermPage = lazy(() => import("src/pages/dashboard/perm"));
export const ShequPage = lazy(() => import("src/pages/dashboard/shequ"));
export const InfoPage = lazy(() => import("src/pages/dashboard/info"));
export const ModelPage = lazy(() => import("src/pages/dashboard/model"));
export const ProductsPage = lazy(() => import("src/pages/dashboard/products"));
// frontend
export const HomePage = lazy(() => import("src/pages/frontend/home"));
export const InteractionPage = lazy(
  () => import("src/pages/frontend/interaction")
);
export const ShowPage = lazy(() => import("src/pages/frontend/show"));
export const ArchivePage = lazy(() => import("src/pages/frontend/archive"));
export const CommunityPage = lazy(() => import("src/pages/frontend/community"));
export const PostDetailPage = lazy(
  () => import("src/pages/frontend/post-detail")
);
export const EmotionPage = lazy(() => import("src/pages/frontend/emotion"));

export const LoginPage = lazy(() => import("src/pages/login"));
export const RegisterPage = lazy(() => import("src/pages/register"));
export const Page404 = lazy(() => import("src/pages/page-not-found"));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <RequireAuth>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </RequireAuth>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: "user", element: <UserPage /> },
        { path: "role", element: <RolePage /> },
        { path: "perm", element: <PermPage /> },
        { path: "shequ", element: <ShequPage /> },
        { path: "info", element: <InfoPage /> },
        { path: "model", element: <ModelPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
      ],
    },
    {
      path: "front",
      element: (
        <RequireAuth>
          <FrontEndLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </FrontEndLayout>
        </RequireAuth>
      ),
      children: [
        { path: "home", element: <HomePage />, index: true },
        { path: "interaction", element: <InteractionPage /> },
        { path: "show", element: <ShowPage /> },
        { path: "archive", element: <ArchivePage /> },
        { path: "community", element: <CommunityPage /> },
        { path: "community/:pid", element: <PostDetailPage /> },
        { path: "emotion", element: <EmotionPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
