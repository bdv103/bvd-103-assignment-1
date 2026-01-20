import books from './../mcmasteful-book-list.json';

export interface Book {
  name: string,
  author: string,
  description: string,
  price: number,
  image: string,
};

// If you have multiple filters, a book matching any of them is a match.
async function listBooks(filters?: Array<{ from?: number, to?: number }>): Promise<Book[]> {
// build the query string based on the filters
        const query = filters?.map(({ from, to }, index) => {
          let result = ''
          if (typeof from === 'number') {
            result += `&filters[${index}][from]=${from}`
         }
          if (typeof to === 'number') {
           result += `&filters[${index}][to]=${to}`
        }
          return result
     }).join('&') ?? ''

// fetch the data from the backend server
     const response = await fetch(`http://localhost:3000/books?${query}`);

     const books = await response.json() as Book[];;

// return the data to the website
  return books;
}


const assignment = "assignment-1";

export default {
  assignment,
  listBooks
};
