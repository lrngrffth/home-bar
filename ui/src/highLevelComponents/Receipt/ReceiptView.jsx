import { observer } from "mobx-react"
import { useContext } from "react";
import cat from '../../images/music_cat.png'
import { Button } from "../../lowLevelComponents/Button";
import { RootStoreContext } from "../../providers/RootStoreContext";
import yarn from '../../images/yarn-ball.png'
import pawPrint from '../../images/footprint.png'
import { DashCircle } from "react-bootstrap-icons";

const Receipt = observer(() => {
  // stores
  let rootStore = useContext(RootStoreContext);
  let receiptStore = rootStore.receiptStore;
  return (
    <div className="flex flex-col text-lg items-center w-96 h-screen font-abhaya justify-between py-6 overflow-scroll">
      <div className="w-full flex flex-col items-center px-4">
        <div className="text-2xl font-bold">The Purrfect Brew</div>
        <div>Fitz's Palace, OH</div>
        <div >Tel: (999) CUTE-CAT</div>
        <div className="w-full py-2 bg-paw-print bg-contain bg-repeat-x h-2 my-2 "/>
        <div className=" flex w-full px-4">
          <div className="w-full">Cashier</div>
          <div>#{receiptStore.cashier}</div>
        </div>
        <div className="flex w-full px-4">
          <div className="w-full">Manager</div>
          <div className="w-full text-end">{receiptStore.manager}</div>
        </div>
        <div className="w-full py-2 bg-paw-print bg-contain bg-repeat-x h-2 my-2"/>
        <div className="flex flex-col h-full w-full">
          <div className="flex font-bold w-full px-4">
            <div className="w-full">Name</div>
            <div className="w-full text-end">Price</div>
          </div>
          {receiptStore.items.map((item, key) => (
            <div className="flex w-full pr-4">
              <div className="flex w-full items-center gap-2"><DashCircle onClick={() => receiptStore.removeItem(key)}/>{item["name"]}</div>
              <div className="text-end">{item["price"]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-4 w-full ">
        <div className="w-full py-2 bg-paw-print bg-contain bg-repeat-x h-2 my-2 "/>
        <div className="flex font-bold">
          <div className="w-full">Total</div>
          <div className="flex w-full justify-end text-end"><img src={yarn} alt="yarn ball" className="h-5 w-auto pr-1"/>{receiptStore.total}</div>
        </div>
        <div className="text-sm flex w-full items-center justify-center mb-3">Thanks for stopping by!</div>
        <div className="flex w-full mx-auto justify-center"><Button >Order Up!</Button></div>
      </div>
    </div>
  );
})

export default Receipt;