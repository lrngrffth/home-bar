import { makeAutoObservable } from "mobx"

const managers = ["Stinky Butt", "Bubba", "Cutie Pie", "Handsome Man", "Bubba Boy"]

export default class ReceiptStore {
    initialize() {
        this.value = true;
        this.manager = managers[Math.floor(Math.random() * managers.length)];
        this.cashier = Math.floor(Math.random() * 20);
        this.items = [];
    }

    constructor(rootStore) {
        this.initialize();
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    addItem(item) {
        this.items.push({"name": item["properties"]["Name"]["title"][0]["plain_text"], "price": item["price"], "info": item})
    }

    get total() {
        return this.items.reduce((sum, item) => sum + (Number(item["price"]) || 0), 0).toFixed(2);
    }

    removeItem(index) {
        this.items.splice(index, 1)
    }
}