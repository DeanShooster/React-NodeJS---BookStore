import { errorHandler, server } from "./config";

const baseURL = "/books";

export async function GetSpotlight() {
  const result = await fetch(`${server}${baseURL}/spotlight`, {
    method: "GET",
  });
  return errorHandler(result);
}

export async function GetBooks() {
  const result = await fetch(`${server}${baseURL}`, {
    method: "GET",
  });
  return errorHandler(result);
}

export async function GetLatestReviews() {
  const result = await fetch(`${server}${baseURL}/latest-reviews`, {
    method: "GET",
  });
  return errorHandler(result);
}
