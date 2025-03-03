import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { PageLayout } from "./pages/PageLayout";
import { RouterLayout } from "./pages/RouterLayout";
import { RouterLayoutV2 } from "./pages/RouterLayoutV2";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/*" Component={PageLayout} />
          <Route path="/react-router/*" Component={RouterLayout} />
          <Route path="/react-router-v2/*" Component={RouterLayoutV2} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
