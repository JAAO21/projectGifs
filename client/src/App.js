import { Route } from "wouter";

import React, { Suspense } from "react";

import { SearchResult } from "./pages/SearchResults";
import { Detail } from "./pages/Detail";
import { Login } from "pages/Login/Login";
import { Register } from "pages/Register";
import PageError404 from "./pages/Error404/Error404";

import { GifsContextProvider } from "./context/GifsContext";
import { UserContextProvider } from "context/UserContext";
import Header from "components/Header/Header";
import "./App.css";

const HomePage = React.lazy(() => import("./pages/Home/index.js"));

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header />
        <Suspense fallback={null}>
          <section>
            <GifsContextProvider>
              <Route component={HomePage} path="/" />
              <Route
                component={SearchResult}
                path="/search/:keyword/:rating?"
              />
              <Route component={Detail} path="/gif/:id" />
              <Route component={Register} path="/register" />
              <Route component={Login} path="/login" />
              <Route component={PageError404} path="/404" />
            </GifsContextProvider>
          </section>
        </Suspense>
      </div>
    </UserContextProvider>
  );
}

export default App;
