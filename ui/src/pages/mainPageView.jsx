import { observer } from "mobx-react"
import { useContext } from "react";
import cat from '../images/music_cat.png'
import { Button } from "../lowLevelComponents/Button";
import { RootStoreContext } from "../providers/RootStoreContext";

const MainPage = observer(() => {
  // stores
  let rootStore = useContext(RootStoreContext);
  let mainPageStore = rootStore.mainPageStore;
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full min-h-screen max-h-full bg-cotton-candy font-abhaya text-5xl text-deep-marroon">
      <div className="">Welcome to</div>
      <div className="font-extrabold">The Purrfect Brew</div>
      <div className="w-96"><img src={cat} alt="Cat listening to music"/></div>
      <Button newStyle="large">Order Now</Button>
    </div>
  );
})

export default MainPage;
