import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    description: string;
    productId: bigint;
    quantity: bigint;
    price: bigint;
}
export type Time = bigint;
export interface Customer {
    name: string;
    address: string;
    customerId: bigint;
    phone: string;
}
export interface OrderType {
    status: OrderStatus;
    total: bigint;
    customer: Customer;
    orderId: bigint;
    timestamp: Time;
    products: Array<Product>;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum OrderStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCustomer(name: string, address: string, phone: string): Promise<bigint>;
    addProduct(name: string, description: string, price: bigint, quantity: bigint): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(customerId: bigint, productIds: Array<bigint>, quantities: Array<bigint>): Promise<bigint>;
    deleteCustomer(customerId: bigint): Promise<void>;
    deleteOrder(orderId: bigint): Promise<void>;
    deleteProduct(productId: bigint): Promise<void>;
    getAllCustomers(): Promise<Array<Customer>>;
    getAllOrders(): Promise<Array<OrderType>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomer(customerId: bigint): Promise<Customer>;
    getOrder(orderId: bigint): Promise<OrderType>;
    getProduct(productId: bigint): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    updateCustomer(customerId: bigint, name: string, address: string, phone: string): Promise<void>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
    updateProduct(productId: bigint, name: string, description: string, price: bigint, quantity: bigint): Promise<void>;
}
