// EXTERNAL IMPORTS
import {useSelector} from 'react-redux'

export const useProductsByCategory=(category,count)=>{
    
    const {products}=useSelector(store=>store.products)
    const categorizedProducts=[];
    let i=0;
    if(count){
        while (count!=0&&i<products.length) {
            if(products[i].category===category){
                    categorizedProducts.push(products[i])
                    count--;
            }
            i++;
    }

    }else{
         categorizedProducts.push(
      ...products.filter((product) => product.category === category)
    );
    }
    return categorizedProducts;
}