import { makeAutoObservable } from "mobx"

const managers = ["Stinky Butt", "Bubba", "Cutie Pie", "Handsome Man", "Bubba Boy"]

export default class ReceiptStore {
    initialize() {
        this.value = true;
        this.manager = managers[Math.floor(Math.random() * managers.length)];
        this.cashier = Math.floor(Math.random() * 20);
        this.total = 0.0;
    }

    constructor(rootStore) {
        this.initialize();
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
}