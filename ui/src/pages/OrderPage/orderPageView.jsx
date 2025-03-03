import { observer } from "mobx-react"
import { useContext, useEffect } from "react";
import Receipt from "../../highLevelComponents/Receipt/ReceiptView";
import { RootStoreContext } from "../../providers/RootStoreContext";
import clsx from 'clsx';
import Caffiene from "../../highLevelComponents/CaffieneDisplay/Caffiene";

const MainPage = observer(() => {
  // stores
  let rootStore = useContext(RootStoreContext);
  let orderPageStore = rootStore.orderPageStore;
  console.log(orderPageStore.display)

  useEffect(() => {orderPageStore.getSpecialtyDrinks()}, []);
  return (
    <div className="flex items-center justify-center min-w-full  h-screen">
      {orderPageStore.loading ? <div>loading</div> :
      <>
        <div className="flex flex-col w-full min-h-screen max-h-full bg-deep-marroon">
          <div className="text-dusk-rose font-semibold font-abhaya text-6xl w-full mx-6 mt-4">
            MENU
            <hr className=""/>
          </div>
          <div className="flex gap-3 text-dusk-rose font-abhaya text-xl mx-auto mt-3 divide-x ">
            {orderPageStore.itemTypes.map((item, key) => (
              <div key={key} className={clsx("w-full pl-3 border-dusk-rose cursor-pointer", {'font-semibold': item == orderPageStore.itemType, 'underline': item == orderPageStore.itemType})} onClick={() => orderPageStore.selectItemType(item)}>{item}</div>
            ))}
          </div>
          {orderPageStore.itemType == "Bases" &&
              <div className="flex flex-col gap-0 mt-12 mx-12">
                <div className="flex mr-auto text-dusk-rose">
                  {orderPageStore.subTypes[orderPageStore.itemType].map((item, key) => (
                    <div 
                      className={clsx("flex border border-dusk-rose rounded-t-lg w-full min-w-24 justify-center py-1", {"bg-dusk-rose": item == orderPageStore.subType, "text-deep-marroon": item == orderPageStore.subType})}
                      onClick={() => orderPageStore.selectSubType(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center border border-dusk-rose text-cotton-candy divide-y divide-dusk-rose overflow-y-scroll">
                    {orderPageStore.subType == "Specialties" && orderPageStore.specialties.map((item, key) => (
                      <div className={clsx("flex flex-col w-full gap-1 py-3 relative", {"text-dusk-rose": item["properties"]["InStock"]["select"]["name"] != "no"})}>
                        <div className="absolute right-4">{item["price"]}</div>
                        <div className="flex gap-2 items-center text-2xl pl-4">{item["properties"]["Name"]["title"][0]["plain_text"]}<Caffiene caffieneLevel={item["properties"]["Caffiene"]["select"]["name"]}/></div>
                        <div className="pl-8">{item["properties"]["Description"]["rich_text"][0]["plain_text"]}</div>
                        <div className="pl-8 font-bold">{item["properties"]["FlavorNotes"]["rich_text"][0]["plain_text"]}</div>
                        <div className="pl-8 font-bold">{item["properties"]["Effects"]["rich_text"].length > 0 ? item["properties"]["Effects"]["rich_text"][0]["plain_text"] : ""}</div>
                      </div>
                    ))}
                    {orderPageStore.subType == "Tea" && Object.keys(orderPageStore.teas).map((type, key) => (
                      <>
                        <div className="flex h-12 bg-dusk-rose text-deep-marroon w-full items-center justify-center text-2xl font-abhaya font-bold">{type} Tea</div>
                        {orderPageStore.teas[type].map((item, key) => (
                          <div className={clsx("flex flex-col w-full gap-1 py-3 relative", {"text-dusk-rose": item["properties"]["InStock"]["select"]["name"] != "no"})}>
                            <div className="absolute right-4">{item["price"]}</div>
                            <div className="flex gap-2 items-center text-2xl pl-4">{item["properties"]["Name"]["title"][0]["plain_text"]}<Caffiene caffieneLevel={item["properties"]["Caffiene"]["select"]["name"]}/></div>
                            <div className="pl-8">{item["properties"]["Description"]["rich_text"][0]["plain_text"]}</div>
                            <div className="pl-8 font-bold">{item["properties"]["FlavorNotes"]["rich_text"][0]["plain_text"]}</div>
                            <div className="pl-8 font-bold">{item["properties"]["Effects"]["rich_text"].length > 0 ? item["properties"]["Effects"]["rich_text"][0]["plain_text"] : ""}</div>
                          </div>
                        ))}
                      </>
                    ))}
                </div>
              </div>
            }
        </div>
        <Receipt/>
      </>
      }
    </div>
  );
})

export default MainPage;
