import { makeAutoObservable } from "mobx"

const managers = ["Stinky Butt", "Bubba", "Cutie Pie", "Handsome Man", "Bubba Boy"]

export default class ReceiptStore {
    initialize() {
        this.value = true;
        this.manager = managers[Math.floor(Math.random() * managers.length)];
        this.cashier = Math.floor(Math.random() * 20);
        this.items = [[]];
        this.selectedDrink = 0;
    }

    constructor(rootStore) {
        this.initialize();
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    addItem(item) {
        this.items[this.selectedDrink].push({"name": item["properties"]["Name"]["title"][0]["plain_text"], "price": item["price"], "info": item})
    }

    removeDrink(drinkNum) {
        this.items.splice(drinkNum,1);
        if (this.items.length <= this.selectedDrink + 1) {
            this.selectedDrink--;
        }
    }

    get total() {
        return this.items.reduce((sum, drink) => sum + drink.reduce((subSum, item) => (Number(item["price"]) || 0), 0), 0).toFixed(2);
    }

    removeItem(drinkNum, index) {
        this.items[drinkNum].splice(index, 1)
    }

    addDrink() {
        this.items.push([]);
    }
    
    selectDrink(drinkNum) {
        this.selectedDrink = drinkNum;
    }
}