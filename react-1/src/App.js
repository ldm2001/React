import MyB from "./MyButton"
import { Button1, Button3 } from "./BottonLib";
import AboutPage from "./AboutPage";
import Profile from "./Profile";
import ShoppingList from "./ShoppingList";

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyB /><br />
      <Button1 />&nbsp;
      <Button3 />
      <AboutPage />
      <Profile />
      <ShoppingList />
    </div>
  );
}