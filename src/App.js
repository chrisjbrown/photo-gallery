import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Gallery from "./pages/Gallery";

const Layout = styled.div`
  max-width: 1020px;
  margin: 0 auto;
`;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/:photoId?">
            <Gallery />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
