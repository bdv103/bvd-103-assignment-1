import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import bookRoutes from './books/book_routes';

const app = new Koa();

app.use(cors()); 
app.use(bodyParser());

app.use(bookRoutes.routes());
app.use(bookRoutes.allowedMethods());

app.listen(3000, () => {
    console.log('Server on 3000');
});