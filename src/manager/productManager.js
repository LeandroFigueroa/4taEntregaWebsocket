import fs from 'fs';
import {__dirname} from '../path.js';

const productsFilePath = __dirname + '/json/products.json';

export const sumarId = async() => {
    try {
        let id = 0;
        const products = await getProducts();
        products.map(product => {
            if (product.id > id) {
                id = product.id;
            }
        });
        return id + 1;
    } catch (error) {
        console.log(error);
    }
}

export const getProducts = async () => {
    try {
        if (fs.existsSync(productsFilePath)) {
            const product = await fs.promises.readFile(productsFilePath, 'utf-8');
            return JSON.parse(product);
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (name ,price, description) => {
    try {
        const products = await getProducts();
        const product = {
            id: await sumarId(),
            name,
            price,
            description
        }
        products.push(product);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}


export const deleteProduct = async (id) => {
    try {
        let products = await getProducts();
        let index = products.findIndex(product => product.id == id);
        products.splice(index, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}