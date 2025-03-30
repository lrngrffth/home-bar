import { observer } from "mobx-react"
import { useContext } from "react";
import cat from '../../images/music_cat.png'
import { Button } from "../../lowLevelComponents/Button";
import { RootStoreContext } from "../../providers/RootStoreContext";
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';
import { Link } from "react-router-dom";



const RecipePage = observer(() => {
  // stores
  let rootStore = useContext(RootStoreContext);
  let recipePageStore = rootStore.recipeStore;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-screen bg-cotton-candy font-abhaya text-5xl text-deep-marroon">
      <div className="flex flex-col w-full h-screen overflow-scroll pb-8">
        <div className="text-dusk-rose font-semibold font-abhaya text-6xl mx-6 mt-4">
          <div>
            Order Up
          </div>
          <hr className="border-deep-marroon"/>
        </div>
        <div className="flex h-full pt-12 w-full mx-12 gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col h-full bg-dusk-rose w-52 rounded-3xl text-xl py-3 px-3 gap-1">
              <div className="font-bold px-3">Ticket</div>
              <div className="h-full px-3">
                {recipePageStore.drinks.map((drink, key) => (
                  <div 
                    className={clsx("pl-6 hover:bg-cotton-candy hover:bg-opacity-20 font-light", {"bg-cotton-candy": recipePageStore.currentDrink == key, "bg-opacity-50":  recipePageStore.currentDrink == key})} 
                    onClick={() => recipePageStore.setDrink(key)}
                  >
                    {drink}
                  </div>
                ))}
              </div>
              <Button dark={true} onClick={() =>navigate("/")}>Close ticket</Button>
            </div>
            <Button onClick={() =>navigate("/order")}>Back</Button>
          </div>
          <div className="flex flex-col w-full pl-8 font-inter font-light text-5xl pr-48">
            <div>Ingredients</div>
            <ul className="list-disc text-4xl ml-6 pl-6 pt-6 pb-4">
              {Object.keys(recipePageStore.recipes[recipePageStore.currentDrink]["Ingredients"]).map((item, key) => (
                <>
                  {item != "Add Ons" &&
                    <div className="pb-4">
                      <div className="pb-3">{item}</div>
                      {recipePageStore.recipes[recipePageStore.currentDrink]["Ingredients"][item].map((ingredient, key2) => (
                        <li className="ml-16 pb-2">{ingredient}</li>
                      ))}
                    </div>
                  }
                </>
              ))}
              {recipePageStore.recipes[recipePageStore.currentDrink]["Ingredients"]["Add Ons"] && 
                <>
                  <div className="pb-3">Add Ons</div>
                  {recipePageStore.recipes[recipePageStore.currentDrink]["Ingredients"]["Add Ons"].map((ingredient, key2) => (
                    <li className="ml-16 pb-2">{ingredient}</li>
                  ))}
                </>
              }
            </ul>
            <div>Directions</div>
            <ul className="list-disc text-4xl ml-6 pl-6 pt-6 pb-4">
              {Object.keys(recipePageStore.recipes[recipePageStore.currentDrink]["Directions"]).map((item, key) => (
                <>
                  {item != "Combine" &&
                    <div className="pb-4">
                      <div className="pb-3">{item}</div>
                      {recipePageStore.recipes[recipePageStore.currentDrink]["Directions"][item].map((step, key2) => (
                        <li className="ml-16 pb-2">{step}</li>
                      ))}
                    </div>
                  }
                </>
              ))}
              {recipePageStore.recipes[recipePageStore.currentDrink]["Directions"]["Combine"] && 
                <>
                  <div className="pb-3">Build Drink</div>
                  {recipePageStore.recipes[recipePageStore.currentDrink]["Directions"]["Combine"].map((step, key2) => (
                    <li className="ml-16 pb-2">{step}</li>
                  ))}
                </>
              }
              <div>Enjoy!</div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
})

export default RecipePage;
