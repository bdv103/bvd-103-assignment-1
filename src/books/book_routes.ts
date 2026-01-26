import Router from '@koa/router';
const router = new Router();
let books: any[] = [];

router.get('/books', (ctx) => {
    ctx.body = books;
});

router.post('/books', (ctx) => {
    // Cast the body to 'any' to fix the "type is unknown" error
    const book = ctx.request.body as any; 
    
    book.id = books.length + 1;
    books.push(book);
    
    ctx.status = 201;
    ctx.body = book;
});

export default router;