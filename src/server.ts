import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import bookRoutes from './books/book_routes';

const app = new Koa();
const router = new Router();

const PORT = 9080;

// middleware
app.use(cors());
app.use(bodyParser());

// ,ount /books routes
router.use('/books', bookRoutes.routes(), bookRoutes.allowedMethods());

// apply router to app
app.use(router.routes());
app.use(router.allowedMethods());

// start server
app.listen(PORT, () => {
  console.log(`Koa server running at http://localhost:${PORT}`);
});
