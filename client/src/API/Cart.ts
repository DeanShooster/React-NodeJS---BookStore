import { errorHandler, server } from "./config";

const baseURL = "/cart";

export async function AddBookToCart(bookName: string, token: string) {
  const result = await fetch(`${server}${baseURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify({ bookName }),
  });
  return errorHandler(result);
}

export async function RemoveBookFromCart(bookName: string, token: string) {
  const result = await fetch(`${server}${baseURL}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify({ bookName }),
  });
  return errorHandler(result);
}
