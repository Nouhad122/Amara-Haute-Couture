import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const BASE_URL = 'http://localhost:3000';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/shop/products`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'Failed to parse error response'
            }));
            throw new Error(errorData.message || 'Failed to fetch products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch products error:', error);
        throw error;
    }
}

export const addProduct = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/products`, {
            method: 'POST',
            body: formData // FormData will automatically set the correct Content-Type
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'Failed to parse error response'
            }));
            throw new Error(errorData.message || 'Failed to add product');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Add product error:', error);
        throw error;
    }
}

export const fetchProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/shop/products/${id}`);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'Failed to parse error response'
            }));
            throw new Error(errorData.message || 'Failed to fetch product');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch product error:', error);
        throw error;
    }
}

export const updateProduct = async (id, formData) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/products/${id}`, {
            method: 'PATCH',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'Failed to parse error response'
            }));
            throw new Error(errorData.message || 'Failed to update product');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Update product error:', error);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/admin/products/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'Failed to parse error response'
            }));
            throw new Error(errorData.message || 'Failed to delete product');
        }

        return null;
    } catch (error) {
        console.error('Delete product error:', error);
        throw error;
    }
}