import { makeAutoObservable } from "mobx"
import {getItemsFromDatabase} from "../../api/api"
import teaBackground from './tea_info.json';
import items from './response.json'

export default class OrderPageStore {
    initialize() {
        this.itemType = "Bases";
        this.itemTypes = ["Bases", "Add Ons", "Booze", "Toppings"];
        this.options = [];
        this.loading = false;
        this.subTypes = {
            "Bases": {"Specialties": {"items": []}, "Tea": {"items": [], "subTypes": true, "background": teaBackground}, "Coffee": {"items": [], "subTypes": true}, "Misc": {"items": []}},
            "Add Ons": {"Syrups": {"items": []}, "Spices": {"items": []}, "Milk and Sugar": {"items": [], "subTypes": true}},
            "Booze": {"Liquor": {"items": [], "subTypes": true}, "Beer and Wine": {"items": [], "subTypes": true}, "Mixed Drinks": {"items": [], "subTypes": true}},
            "Toppings": {"Whipped Topping": {"items": []}, "Garnish": {"items": []}}
        }
        this.subType = {"Bases": "Specialties", "Add Ons": "Syrups", "Booze": "Liquor", "Toppings": "Whipped Topping"};
        this.infoModalOpen = "";
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
        this.subType[this.itemType] = newType;
    }

    async getSpecialtyDrinks() {
        this.loading = true;
        this.options = items;
        // this.options = (await getItemsFromDatabase({})).map(option => ({...option, ["price"]: ((Math.random() * 4) + 3).toFixed(2)}))
        this.subTypes["Bases"]["Specialties"]["items"] = this.options.filter((option) => option["properties"]["Specialty"]["select"]["name"] == "yes")
        this.subTypes["Bases"]["Tea"]["items"] = this.options.filter((option) => option["properties"]["Category"]["select"]["name"] == "Tea").reduce((acc, tea) => {
            if (!acc[tea["properties"]["SubType"]["select"]["name"]]) {
                acc[tea["properties"]["SubType"]["select"]["name"]] = [];
            }
            acc[tea["properties"]["SubType"]["select"]["name"]].push(tea);
            return acc;
        }, {});
        this.loading = false;
    }

    openInfoModal(type) {
        this.infoModalOpen = type;
    }

    closeInfoModal() {
        this.infoModalOpen = "";
    }
}