import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/products');

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch products');
    }

    const data = await response.json();
    
    return data;
}

export const addProduct = async (productData) => {
    const response = await fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message || 'Failed to add product');
    }

    const data = await response.json();

    return data;
}

export const fetchProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    
    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch product');
    }

    const data = await response.json();

    return data;
}