// Define a type for user information
export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// Define a type for product information
export interface Product {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
}

// Define a type for order information
export interface Order {
    orderId: number;
    userId: number;
    productIds: number[];
    totalAmount: number;
}

// Enum for order statuses
export enum OrderStatus {
    Pending = 'Pending',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Canceled = 'Canceled'
}

// Type for API response
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}