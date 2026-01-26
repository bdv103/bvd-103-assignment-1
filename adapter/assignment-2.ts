export interface Book {
  id?: number;
  title: string;
  author?: string;
  description?: string;
  price?: number;
  image?: string;
}

const BASE_URL = "http://localhost:3000";

const assignment = {
  async listBooks(): Promise<Book[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return response.json() as Promise<Book[]>;
  },

  async createOrUpdateBook(book: Book): Promise<Book> {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });

    if (!response.ok) {
      throw new Error("Failed to create or update book");
    }

    return response.json() as Promise<Book>;
  },

  async removeBook(id: number | string): Promise<boolean> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }

    return true;
  }
};

export default assignment;
