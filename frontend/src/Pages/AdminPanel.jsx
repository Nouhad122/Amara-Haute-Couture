import React, { useRef, useState } from 'react'
import AddProductForm from '../Components/AdminPanel/AddProductForm/AddProductForm'
import AdminProducts from '../Components/AdminPanel/AdminProducts/AdminProducts'
import Title from '../Components/SharedComps/Title'

const AdminPanel = () => {
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
    <div className="extra-margin">
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

export default AdminPanel
