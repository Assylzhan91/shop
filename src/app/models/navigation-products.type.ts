export const productsNavigate = ['Phone', 'Tablet', 'Laptop', 'Cart'] as const
export type ProductTypes = typeof productsNavigate[number]
