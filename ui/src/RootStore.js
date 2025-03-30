import ReceiptStore from "./highLevelComponents/Receipt/ReceiptStore";
import MainPageStore from "./pages/MainPage/mainPageStore";
import OrderPageStore from "./pages/OrderPage/orderPageStore";
import RecipePageStore from "./pages/RecipePage/RecipeStore";

export default class RootStore {
    constructor() {
        this.mainPageStore = new MainPageStore(this);
        this.orderPageStore = new OrderPageStore(this);
        this.receiptStore = new ReceiptStore(this);
        this.recipeStore = new RecipePageStore(this);
    }
}