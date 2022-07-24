import "./App.css";
import Login from "./Login";

function App() {
  const a = 2;
  const b = 5;
  return (
    <div className='App'>
      <header className='App-header'>
        Learn React
        <Login />
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Orange</li>
        </ul>
        <h1 data-testid='mytestid'>Hello</h1>
        <span title='sum'>{a + b}</span>
      </header>
    </div>
  );
}

export default App;
