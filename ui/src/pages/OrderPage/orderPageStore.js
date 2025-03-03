import { makeAutoObservable } from "mobx"
import {getItemsFromDatabase} from "../../api/api"
import teaBackground from './tea_info.json';

export default class OrderPageStore {
    initialize() {
        this.itemType = "Bases";
        this.itemTypes = ["Bases", "Flavorings", "Booze", "Toppings"];
        this.options = [];
        this.specialties = [];
        this.teas = [];
        this.loading = false;
        this.subTypes = {
            "Bases": ["Specialties", "Tea", "Coffee", "Misc"]
        }
        this.subType = "Specialties";
        this.teaInformation = teaBackground;
    }

    constructor(rootStore) {
        this.initialize();
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    selectItemType(newType) {
        this.itemType = newType;
    }

    selectSubType(newType) {
        this.subType = newType;
    }

    async getSpecialtyDrinks() {
        this.loading = true;
        this.options = (await getItemsFromDatabase({})).map(option => ({...option, ["price"]: ((Math.random() * 4) + 3).toFixed(2)}))
        this.specialties = this.options.filter((option) => option["properties"]["Specialty"]["select"]["name"] == "yes")
        this.teas = this.options.filter((option) => option["properties"]["Category"]["select"]["name"] == "Tea").reduce((acc, tea) => {
            if (!acc[tea["properties"]["SubType"]["select"]["name"]]) {
                acc[tea["properties"]["SubType"]["select"]["name"]] = [];
            }
            acc[tea["properties"]["SubType"]["select"]["name"]].push(tea);
            return acc;
        }, {});
        this.loading = false;
    }
}