import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootPage from './Pages/RootPage';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import ProductDetails from './Pages/ProductDetails';
import AdminPanel from './Pages/AdminPanel';
import NotFound from './Pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'shop/:id/:name', element: <ProductDetails /> },
      { path: 'admin', element: <AdminPanel /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
