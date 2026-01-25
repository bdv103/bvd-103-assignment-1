import Router from '@koa/router';
import assignment from '../../adapter/assignment-2';
import type { Book } from '../../adapter/assignment-2';

const router = new Router();

// GET /books
router.get('/', async (ctx) => {
  try {
    const books: Book[] = await assignment.listBooks();
    ctx.body = books;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch books' };
  }
});

// POST /books
router.post('/', async (ctx) => {
  try {
    const body = ctx.request.body as Book;
    const newBook: Book = await assignment.createOrUpdateBook(body);
    ctx.body = newBook;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: (err as Error).message };
  }
});

// DELETE /books/:id
router.delete('/:id', async (ctx) => {
  try {
    const success = await assignment.removeBook(ctx.params.id);
    ctx.body = { success };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to remove book' };
  }
});

export default router;
