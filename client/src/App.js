import React, { useContext, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { CategoryAdmin, TagsAdmin } from "./Admin";
import { Home, Navbar, Notfound, Sidebar } from "./components";
import { Advertisements, AdvetismenetPanal } from "./components/Advertisement";
import { CategoryContextProvider } from "./contexts/category";
import { TagContextProvider } from "./contexts/tags";
import { AdsContextProvider } from "./contexts/ads";
import { Login, Signup } from "./components/User";
import { UserConetext, UserContextProvider } from "./contexts/user";
import Unauthorized from "./components/Unauthoriezed";
import ProtectedRoute from "./Authentication/ProtectedRoute";

function App() {
  const [user, setUser] = useContext(UserConetext).user;
  return (
    <CategoryContextProvider>
      <TagContextProvider>
        <AdsContextProvider>
          {user.email && <Navbar />}
          {user.email && <Sidebar />}
          <div className="container">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />

              <ProtectedRoute path="/CategoryAdmin" component={CategoryAdmin} />

              <ProtectedRoute path="/TagsAdmin" component={TagsAdmin} />

              <ProtectedRoute path="/AdsPanal" component={AdvetismenetPanal} />

              <ProtectedRoute path="/TagsAdmin" component={Unauthorized} />

              <ProtectedRoute
                path="/Advertisement/:id"
                component={Advertisements}
              />
              <Route path="/unauthoraized" component={Unauthorized} />
              <Route path="/notfound" component={Notfound} />

              <Redirect from="/" exact to="/home" />
              <Redirect to="/notfound" />
            </Switch>
          </div>
        </AdsContextProvider>
      </TagContextProvider>
    </CategoryContextProvider>
  );
}

export default App;
