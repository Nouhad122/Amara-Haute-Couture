import React from 'react'
import AddProductForm from '../Components/AdminPannel/AddProductForm'
import AdminProducts from '../Components/AdminPannel/AdminProducts'
import Title from '../Components/SharedComps/Title'
const AdminPannel = () => {
  return (
    <div>
      <Title title="Admin Pannel" />
      <AddProductForm />
      <AdminProducts />
    </div>
  )
}

export default AdminPannel
