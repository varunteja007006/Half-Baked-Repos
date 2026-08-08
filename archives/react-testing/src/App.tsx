import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <main>
        <h1>Hello</h1>
        <button onClick={() => setShow(!show)}>show</button>
        {show && <p>This is the hidden content 😟</p>}
      </main>
    </>
  );
}

export default App;
