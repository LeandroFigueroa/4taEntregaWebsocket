import express from 'express';
import { __dirname } from './path.js';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import viewsRoutes from './routes/viewRoutes.js';
import { addProduct, getProducts, deleteProduct } from './manager/productManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use("/", viewsRoutes);



//server ok
const port = 8080;
const httpServer = app.listen(port, ()=>{
console.log('Server Conectado ATR ', port)
});


const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('Cliente connectado, by websocket');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado, by websocket');
    });
    socket.on('newProduct', async (producto) => {
        await addProduct(producto.name, producto.price, producto.description);
        const products = await getProducts();
        socketServer.emit('getProducts', products);
    });
    socket.on('deleteProduct', async (id) => {
        await deleteProduct(id);
        const products = await getProducts();
        socketServer.emit('deleteProduct', id);
        socketServer.emit('getProducts', products);
    });
});