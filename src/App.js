import { Router } from "@reach/router";

import Posts from "./components/posts";
import Post from "./components/post";
import Add from "./components/add";

function App() {
  return (
    <Router>
      <Posts path="/" />
      <Post path="/posts/:id" />
      <Add path="/add" />
    </Router>
  );
}

export default App;
