import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { authenticate } from "./services/auth";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route path="/login" exact={true} />
    </BrowserRouter>
  );
}

export default App;
