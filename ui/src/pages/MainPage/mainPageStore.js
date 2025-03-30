import { makeAutoObservable } from "mobx"

export default class MainPageStore {
    initialize() {
        this.value = true;
    }

    constructor(rootStore) {
        this.initialize();
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    clearData() {
        this.rootStore.orderPageStore.clearOrder();
        this.rootStore.recipeStore.clearRecipe();
        this.rootStore.receiptStore.cancelOrder();
    }
}