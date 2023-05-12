import { Router } from "express";
import { __dirname } from "../path.js";
import { getProducts } from "../manager/productManager.js";


const router = Router();


router.get("/", async (req, res) => {
    try {
        const products = await getProducts();
        res.render('home', { products });
    } catch (error) {
        console.log(error);
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.log(error);
    }
});


export default router;