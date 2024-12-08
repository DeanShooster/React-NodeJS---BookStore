import { errorHandler, server } from "./config";

const baseURL = "/user";

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IRegisterCredentials extends ILoginCredentials {
  name: string;
}

export async function Login(credentials: ILoginCredentials) {
  const result = await fetch(`${server}${baseURL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return errorHandler(result);
}

export async function Register(credentials: IRegisterCredentials) {
  const result = await fetch(`${server}${baseURL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return errorHandler(result);
}

export async function Auth(token: string) {
  const result = await fetch(`${server}${baseURL}/auth`, {
    method: "GET",
    headers: { token },
  });
  return errorHandler(result);
}
