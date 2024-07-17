import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/features/Layout';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { MyAccountPage } from '@/pages/MyAccount';
import ProductDetailPage from '@/pages/ProductDetail';
import PurchasePage from '@/pages/Purchase';
import { ThemePage } from '@/pages/Theme';

import { PrivateRoute } from './components/PrivateRoute';
import { RouterPath } from './path';

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <Layout />,
    children: [
      {
        path: RouterPath.home,
        element: <HomePage />,
      },
      {
        path: RouterPath.theme,
        element: <ThemePage />,
      },
      {
        path: RouterPath.myAccount,
        element: <PrivateRoute />,
        children: [
          {
            path: RouterPath.myAccount,
            element: <MyAccountPage />,
          },
        ],
      },
      {
        path: RouterPath.productDetail(':productId'),
        element: <ProductDetailPage />,
      },
      {
        path: RouterPath.order(':productId'),
        element: <PurchasePage />,
      },
      {
        path: RouterPath.notFound,
        element: <Navigate to={RouterPath.home} />,
      },
    ],
  },
  {
    path: RouterPath.login,
    element: <LoginPage />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
