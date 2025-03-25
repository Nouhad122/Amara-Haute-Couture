import React, { useRef, useState } from 'react'
import AddProductForm from '../Components/AdminPannel/AddProductForm'
import AdminProducts from '../Components/AdminPannel/AdminProducts'
import Title from '../Components/SharedComps/Title'

const AdminPannel = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const formRef = useRef(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div>
      <Title
        title="Admin Pannel"
        subtitle="Only admins can add, edit and delete all products"/>
      <div ref={formRef}>
        <AddProductForm 
          editingProduct={editingProduct} 
          onCancelEdit={handleCancelEdit}
        />
      </div>
      <AdminProducts onEdit={handleEdit} />
    </div>
  )
}

export default AdminPannel
