import React, { useEffect } from "react";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { UserData } from "./pages/UserData";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Layer } from "./components/Layer";
import { RegisterBlock1 } from "./pages/RegisterBlock1";
import { RegisterBlock2 } from "./pages/RegisterBlock2";
import { RegisterBlock3 } from "./pages/RegisterBlock3";
import { RegisterBlock4 } from "./pages/RegisterBlock4";
import { BookDetail } from "./pages/BookDetail";
import { Collection } from "./pages/Collection";
import { Navbar } from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import MainContext from "./context/MainContext";
import CashBackData from "./pages/CashBackData";
import Policy from "./pages/Policy";
import { ConfirmPolicy } from "./pages/ConfirmPolicy";
import Sale from "./pages/Sale";

export const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <MainContext>
        <div className="wrap">
          <Layer />
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/book/:id" component={BookDetail} />
            <Route path="/collection/:id" component={Collection} />
            <Route path="/search" component={Search} />
            <Route path="/user" component={UserData} />
            <Route path="/auth" component={RegisterBlock1} />
            <Route path="/confirm" component={RegisterBlock2} />
            <Route path="/register" component={RegisterBlock3} />
            <Route path="/confirm-policy" component={ConfirmPolicy} />
            <Route path="/link" component={RegisterBlock4} />
            <Route path="/cashback" component={CashBackData} />
            <Route path="/policy" component={Policy} />
            <Route path="/sale" component={Sale} />
          </Switch>
          <Footer />
        </div>
      </MainContext>
    </BrowserRouter>
  );
};
