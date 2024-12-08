import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./app.scss";

import { DictionaryContextProvider } from "./Context/DictionaryContext";
import { BookContextProvider } from "./Context/BookContext";
import { UserContextProvider } from "./Context/UserContext";

import { routes } from "./router";

import { Header } from "./components/Header";
import { Home } from "./modules/Home";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="app">
      <DictionaryContextProvider>
        <UserContextProvider>
          <BookContextProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path={routes.Home.path} element={<Home />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </BookContextProvider>
        </UserContextProvider>
      </DictionaryContextProvider>
    </div>
  );
}

export default App;
