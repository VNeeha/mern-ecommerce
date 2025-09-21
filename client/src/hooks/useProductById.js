// EXTERNAL IMPORTS
import {useSelector} from 'react-redux'
// LOCAL IMPORTS
import { useProductsByCategory } from "./useProductsByCategory";

export const useProductById=(category,productId)=>{
    const categoryProducts=useProductsByCategory(category);
    const product=categoryProducts.find(product=>product.id==productId)
    return product;
}