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
            "Bases": {"Specialties": {"items": []}, "Tea": {"items": [], "subTypes": true }, "Coffee": {"items": [], "subTypes": true}, "Misc": {"items": []}},
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
        // this.options = items;
        this.options = (await getItemsFromDatabase({})).map(option => ({...option, ["price"]: ((Math.random() * 4) + 3).toFixed(2)}))
        Object.keys(this.subTypes).map((page, i) => {
            Object.keys(this.subTypes[page]).map((type, j) => {
                if (this.subTypes[page][type]["subTypes"] == true) {
                    this.subTypes[page][type]["items"] = this.options.filter((option) => option["properties"]["Category"]["select"] && option["properties"]["Category"]["select"]["name"] == type).reduce((acc, subCat) => {
                        if (!acc[subCat["properties"]["SubType"]["select"]["name"]]) {
                            acc[subCat["properties"]["SubType"]["select"]["name"]] = [];
                        }
                        acc[subCat["properties"]["SubType"]["select"]["name"]].push(subCat);
                        return acc;
                    }, {});
                    try {
                        this.subTypes[page][type]["background"] = this.options.filter((option) => option["properties"]["Category"]["select"] && option["properties"]["Category"]["select"]["name"] == `${type}Background`).reduce((acc, subCat) => {
                            acc[subCat["properties"]["Name"]["title"][0]["text"]["content"]] = JSON.parse(subCat["properties"]["Information"]["rich_text"][0]["text"]["content"]);
                            return acc;
                        }, {});
                    } catch {
                        console.log("Unable to parse background information")
                    }
                } else {
                    this.subTypes[page][type] = this.options.filter((option) => option["properties"]["Category"]["select"] && option["properties"]["Category"]["select"]["name"] == type);
                }
            });
        });
        
        this.subTypes["Bases"]["Specialties"]["items"] = this.options.filter((option) => option["properties"]["Specialty"]["select"] && option["properties"]["Specialty"]["select"]["name"] == "yes")
        this.loading = false;
    }

    openInfoModal(type) {
        this.infoModalOpen = type;
    }

    closeInfoModal() {
        this.infoModalOpen = "";
    }
}