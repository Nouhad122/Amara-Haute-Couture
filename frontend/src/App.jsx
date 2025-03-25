import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootPage from './Pages/RootPage';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import ProductDetails from './Pages/ProductDetails';
import AdminPannel from './Pages/AdminPannel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Shop /> },
      { path: 'products/:id/:name', element: <ProductDetails /> },
      { path: 'admin', element: <AdminPannel /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
