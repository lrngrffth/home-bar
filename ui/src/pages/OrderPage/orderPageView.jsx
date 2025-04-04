import { observer } from "mobx-react"
import { useContext, useEffect } from "react";
import Receipt from "../../highLevelComponents/Receipt/ReceiptView";
import { RootStoreContext } from "../../providers/RootStoreContext";
import clsx from 'clsx';
import Caffiene from "../../highLevelComponents/CaffieneDisplay/Caffiene";
import { InfoCircle, Dot, XCircle} from "react-bootstrap-icons"
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Temp from "../../highLevelComponents/TempDisplay/Caffiene";
import { Dropdown } from "../../lowLevelComponents/Dropdown";
import { Button } from "../../lowLevelComponents/Button";



const MainPage = observer(() => {
  // stores
  let rootStore = useContext(RootStoreContext);
  let orderPageStore = rootStore.orderPageStore;
  let receiptStore = rootStore.receiptStore;
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-screen max-h-screen overflow-hidden">
      {orderPageStore.loading ? <div>loading</div> :
      <>
        <div className="flex flex-col w-full h-screen bg-deep-marroon overflow-scroll pb-8">
          <div className="relative text-dusk-rose font-semibold font-abhaya text-6xl mx-6 mt-4">
            <div>
              MENU
            </div>
            <div className="flex gap-3 text-dusk-rose font-abhaya text-xl mx-auto mt-3 divide-x absolute right-0 top-0 font-medium">
              <div className="w-fit pl-3 border-dusk-rose cursor-pointer text-nowrap" onClick={() => navigate('/')}>Home</div>
              <div className="w-fit pl-3 border-dusk-rose cursor-pointer text-nowrap font-semibold underline">Build My Own</div>
            </div>
            <hr className=""/>
          </div>
          <div className="flex gap-3 text-dusk-rose font-abhaya text-xl mx-auto mt-3 divide-x">
            {orderPageStore.itemTypes.map((item, key) => (
              <div key={key} className={clsx("w-fit pl-3 border-dusk-rose cursor-pointer text-nowrap ", {'font-semibold': item == orderPageStore.itemType, 'underline': item == orderPageStore.itemType})} onClick={() => orderPageStore.selectItemType(item)}>{item}</div>
            ))}
          </div>

          <div className="flex flex-col gap-0 mt-12 mx-12">
            <div className="flex mr-auto text-dusk-rose">
              {Object.keys(orderPageStore.subTypes[orderPageStore.itemType]).map((item, key) => (
                <div 
                  className={clsx("flex border border-dusk-rose rounded-t-lg w-fit min-w-24 justify-center py-1 text-nowrap px-4", {"bg-dusk-rose": item == orderPageStore.subType[orderPageStore.itemType], "text-deep-marroon": item == orderPageStore.subType[orderPageStore.itemType]})}
                  onClick={() => orderPageStore.selectSubType(item)}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center border border-dusk-rose text-cotton-candy divide-y divide-dusk-rose overflow-scroll">
              {"subTypes" in orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]] && orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["subTypes"] == true ? 
                Object.keys(orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["items"]).map((type, key) => (
                  <>
                    <div className="relative flex h-12 bg-dusk-rose text-deep-marroon w-full items-center justify-center text-2xl font-abhaya font-bold">
                      {type}
                      <>{type in orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["background"] && <InfoCircle className="absolute right-4" onClick={() => orderPageStore.openInfoModal(type)}/>}</>
                    </div>
                    <Modal
                      open={orderPageStore.infoModalOpen != ""}
                      onClose={() => orderPageStore.closeInfoModal()}
                      className="flex w-full h-full items-center justify-center"
                    >
                      <div className="relative flex flex-col bg-cotton-candy py-3 px-6 text-dusk-rose gap-3 max-w-xl">
                        <div className="w-full py-2 bg-paw-print bg-contain bg-repeat-x h-2 "/>
                        <div className="absolute left-0 top-3 w-2 px-2 ml-3 py-3 bg-paw-print bg-contain bg-repeat-y h-[calc(100%-30px)] "/>
                        <div className="absolute right-0 top-3 w-2 px-2 mr-3 py-3 bg-paw-print bg-contain bg-repeat-y h-[calc(100%-30px)] "/>
                        <div className="w-full text-4xl font-abhaya font-bold items-center justify-center text-center">{orderPageStore.infoModalOpen} </div>
                        <XCircle className="absolute right-10 top-10 text-xl text-deep-marroon" onClick={() => orderPageStore.closeInfoModal()}/>
                        {orderPageStore.infoModalOpen && Object.keys(orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["background"][orderPageStore.infoModalOpen]).map((quality, key) => (
                          <div className="flex flex-col px-3">
                            <div className="font-semibold">{quality}:</div>
                            {Array.isArray(orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["background"][orderPageStore.infoModalOpen][quality]) ? 
                              orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["background"][orderPageStore.infoModalOpen][quality].map((item, key) => (
                                <div className="flex items-center pl-2"><Dot/>{item}</div>
                              )) :
                              <div className="flex flex-col pl-2">{orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["background"][orderPageStore.infoModalOpen][quality]}</div>
                            }
                          </div>
                        ))}
                        <div className="w-full py-2 bg-paw-print bg-contain bg-repeat-x h-2 "/>
                      </div>
                    </Modal>
                    {orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["items"][type].map((item, key) => (
                      <div className={clsx("flex flex-col w-full gap-1 py-3 relative active:bg-cotton-candy active:opacity-60", {"text-dusk-rose": item["properties"]["InStock"]["select"] ? item["properties"]["InStock"]["select"]["name"] == "no" : true})} onClick={() => {orderPageStore.needsSecondStep(item) ? orderPageStore.openOrderModal(item) : receiptStore.addItem(item, null, null, orderPageStore.itemType)}}>
                        <div className="absolute right-4">{item["price"]}</div>
                        <div className="flex gap-2 items-center text-2xl pl-4">{item["properties"]["Name"]["title"] ? item["properties"]["Name"]["title"][0]["plain_text"] : ""}<Caffiene caffieneLevel={item["properties"]["Caffiene"]["select"] ? item["properties"]["Caffiene"]["select"]["name"] : null}/></div>
                        <div className="pl-8">{item["properties"]["Description"]["rich_text"].length > 0 ? item["properties"]["Description"]["rich_text"][0]["plain_text"] : ""}</div>
                        <div className="pl-8 font-bold">{item["properties"]["FlavorNotes"]["rich_text"].length > 0 ? item["properties"]["FlavorNotes"]["rich_text"][0]["plain_text"] : ""}</div>
                        <div className="pl-8 font-bold">{item["properties"]["Effects"]["rich_text"].length > 0 ? item["properties"]["Effects"]["rich_text"][0]["plain_text"] : ""}</div>
                        <div className="flex w-full gap-2 items-end justify-end pr-4">{item["properties"]["Temp"]["multi_select"].map((temp, i) => (<Temp temperature={temp["name"]} color="pink"/>))}</div>
                      </div>
                    ))}
                  </>
                ))
              : 
              (orderPageStore.subTypes[orderPageStore.itemType][orderPageStore.subType[orderPageStore.itemType]]["items"]).map((item, key) => (
                  <div className={clsx("flex flex-col w-full gap-1 py-3 relative active:bg-cotton-candy active:opacity-60", {"text-dusk-rose": item["properties"]["InStock"]["select"]["name"] == "no"})} onClick={() => {orderPageStore.needsSecondStep(item) ? orderPageStore.openOrderModal(item) : receiptStore.addItem(item, null, null, orderPageStore.itemType)}}>
                    <div className="absolute right-4">{item["price"]}</div>
                    <div className="flex gap-2 items-center text-2xl pl-4">{item["properties"]["Name"]["title"][0]["plain_text"]}<Caffiene caffieneLevel={item["properties"]["Caffiene"]["select"] ? item["properties"]["Caffiene"]["select"]["name"] : null}/></div>
                    <div className="pl-8">{item["properties"]["Description"]["rich_text"].length > 0 ? item["properties"]["Description"]["rich_text"][0]["plain_text"] : ""}</div>
                    <div className="pl-8 font-bold">{item["properties"]["FlavorNotes"]["rich_text"].length > 0 ? item["properties"]["FlavorNotes"]["rich_text"][0]["plain_text"] : ""}</div>
                    <div className="pl-8 font-bold">{item["properties"]["Effects"]["rich_text"].length > 0 ? item["properties"]["Effects"]["rich_text"][0]["plain_text"] : ""}</div>
                    <div className="flex w-full gap-2 items-end justify-end pr-4">{item["properties"]["Temp"]["multi_select"].map((temp, i) => (<Temp temperature={temp["name"]} color="pink"/>))}</div>
                  </div>
              ))}
              <Modal
                open={orderPageStore.orderModalOpen}
                onClose={() => orderPageStore.closeOrderModal()}
                className="flex w-full h-full items-center justify-center"
              >
                {orderPageStore.orderModalOpen ?
                  <div className="relative flex flex-col bg-cotton-candy py-3 px-6 text-dusk-rose gap-3 max-w-xl">
                    <div className="w-full py-2 bg-paw-print bg-contain bg-repeat-x h-2 "/>
                    <div className="absolute left-0 top-3 w-2 px-2 ml-3 py-3 bg-paw-print bg-contain bg-repeat-y h-[calc(100%-30px)] "/>
                    <div className="absolute right-0 top-3 w-2 px-2 mr-3 py-3 bg-paw-print bg-contain bg-repeat-y h-[calc(100%-30px)] "/>
                    <div className="w-full text-4xl font-abhaya font-bold items-center justify-center text-center px-12">{orderPageStore.orderItemSelection["properties"]["Name"]["title"][0]["plain_text"]} </div>
                    <XCircle className="absolute right-10 top-10 text-xl text-deep-marroon" onClick={() => orderPageStore.closeOrderModal()}/>
                    <div className="flex flex-col px-3 w-full items-center justify-center pb-3 gap-6">
                      {orderPageStore.orderItemSelection["properties"] && orderPageStore.orderItemSelection["properties"]["Temp"]["multi_select"].length > 1 &&
                        <Dropdown
                          value={orderPageStore.selectedTemp}
                          handleChange={(e) => orderPageStore.selectTemp(e)}
                          label="Temperature"
                          options={orderPageStore.orderItemSelection["properties"]["Temp"]["multi_select"].map((item) => item.name)}
                        />
                      }
                      {orderPageStore.orderItemSelection["properties"] && orderPageStore.orderItemSelection["properties"]["Shots"]["select"] && orderPageStore.orderItemSelection["properties"]["Shots"]["select"]["name"] == "yes" &&
                        <Dropdown
                          value={orderPageStore.selectedNumShots}
                          handleChange={(e) => orderPageStore.selectNumShots(e)}
                          label="Number of shots"
                          options={["single", "double"]}
                        />
                      }
                      <div className="w-full flex justify-end pr-6"><Button className="w-24" onClick={() => orderPageStore.submitOrderFromModal()}>Add Drink</Button></div>
                    </div>
                    <div className="w-full py-2 bg-paw-print bg-contain bg-repeat-x h-2 "/>
                  </div>
                : <div></div>}
              </Modal>
            </div>
          </div>
        </div>
        <Receipt/>
      </>
      }
    </div>
  );
})

export default MainPage;
