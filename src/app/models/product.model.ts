import { review } from "./review.model";

export interface Product{
    id: number,
    title: string, 
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string, 
    warrantyInformation: string,
    reviews: review[],
    returnPolicy: string,
    minimumOrderQuantity: string, 
}