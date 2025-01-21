export interface OrderProduct {
    product: string;
    material: string;
    group: string;
    quantity: number;
    price: number;
    additionalProduct?: string;
  }
  
  export interface Order {
    products: {
      [key: string]: OrderProduct;
    };
  }