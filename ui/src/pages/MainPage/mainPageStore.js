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
}