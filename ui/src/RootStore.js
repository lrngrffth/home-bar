import MainPageStore from "./pages/mainPageStore";

export default class RootStore {
    constructor() {
        this.mainPageStore = new MainPageStore(this);
    }
}