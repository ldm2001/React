import MyB from "./MyButton"
import { Button1, Button3 } from "./BottonLib";
import AboutPage from "./AboutPage";
import Profile from "./Profile";
import ShoppingList from "./ShoppingList";
import MyButton from "./MyButton";
import CountState from "./CountState";

import './App.css'
import { useState } from "react";

function CountState2({ count, onClick }) {
  return (
    <div>
      <button onClick={onClick}>
        Clicked {count} times
      </button>
    </div>
  );
}

export default function MyApp() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div className="wrapper">
      <h1>Welcome to my app</h1>
      <div>
        <p>default export example</p>
          <MyB /><br />
          <p>named export example</p>
          <Button1 />&nbsp;
          <Button3 />
          <p>wrapping export example</p>
          <AboutPage />
          <p>displaying data</p>
          <Profile />
          <p>Rendering lists</p>
          <ShoppingList />
      </div>
      <div>
        <MyButton />
        <CountState />
      </div>
      <div>
        <p>Sharing data between components</p>
        <CountState2 count={count} onClick={handleClick} />
        <CountState2 count={count} onClick={handleClick} />
      </div>
    </div>
  );
}