export const productValidator = (obj) => {
    const product = obj;
    if (product.title=== "" || product.title === undefined || product.title === null || typeof product.title !== 'string'){
        return 'invalid product title!'
    } else {
        if (product.description === "" || product.description === undefined || product.description === null || typeof product.description !== 'string'){
            return 'invalid product description!'
        } else{
            if (product.code === "" || product.code === undefined || product.code === null || typeof product.code !== 'string'){
                return 'invalid product code!' 
            } else{
                if (product.price === 0 || product.price === undefined || product.price === null || typeof product.price !== 'number'){
                    return 'invalid product price!'
                } else{
                    if (product.status === "" || product.status === undefined || product.status === null || typeof product.status !== 'boolean'){
                        return 'invalid product status!'
                    } else{
                        if (product.stock === 0 || product.stock === undefined || product.stock === null || typeof product.stock !== 'number'){
                            return 'invalid product stock!'
                        } else{
                            if (product.category === "" || product.category === undefined || product.category === null || typeof product.category !== 'string'){
                                return 'invalid product category!'
                            } else{
                                return product
                            }
                        }
                    }
                }
            }
        }
    }
}