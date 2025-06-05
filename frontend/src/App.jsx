import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootPage from './Pages/RootPage';
import NotFound from './Pages/NotFound';
import Loader from './Components/SharedComps/Loader';

// Lazy loaded components
const Home = lazy(() => import('./Pages/Home'));
const Shop = lazy(() => import('./Pages/Shop'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));
const AdminPanel = lazy(() => import('./Pages/AdminPanel'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <NotFound />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ) 
      },
      { 
        path: 'shop', 
        element: (
          <Suspense fallback={<Loader />}>
            <Shop />
          </Suspense>
        ) 
      },
      { 
        path: 'shop/:id/:name', 
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetails />
          </Suspense>
        ) 
      },
      // { 
      //   path: 'admin', 
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <AdminPanel />
      //     </Suspense>
      //   ) 
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
