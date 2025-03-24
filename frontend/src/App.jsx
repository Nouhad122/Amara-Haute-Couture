import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from './Pages/RootPage';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import ProductDetails from './Pages/ProductDetails';
import AdminPannel from './Pages/AdminPannel';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootPage />,
      children: [
        {index: true, element: <Home />},
        {path: 'shop', element: <Shop />},
        {path: 'product/:name', element: <ProductDetails />},
        {path: 'admin', element: <AdminPannel />}
      ]
    }
])

  return (
    <RouterProvider router={router} />
  )
}

export default App
