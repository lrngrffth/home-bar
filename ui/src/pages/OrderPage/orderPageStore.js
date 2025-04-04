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
            "Bases": {"Specialties": {"items": []}, "Tea": {"items": [], "subTypes": true }, "Coffee": {"items": [], "subTypes": true}, "Misc & Mocktails": {"items": []}},
            "Add Ons": {"Syrups": {"items": []}, "Spices": {"items": []}, "Milk and Sugar": {"items": [], "subTypes": true}},
            "Booze": {"Liquor": {"items": [], "subTypes": true}, "Beer and Wine": {"items": [], "subTypes": true}, "Mixed Drinks": {"items": [], "subTypes": true}},
            "Toppings": {"Whipped Topping": {"items": []}, "Garnish": {"items": []}}
        }
        this.subType = {"Bases": "Specialties", "Add Ons": "Syrups", "Booze": "Liquor", "Toppings": "Whipped Topping"};
        this.infoModalOpen = "";
        this.orderModalOpen = false;
        this.orderItemSelection = {};
        this.selectedTemp = "";
        this.selectedNumShots = "";
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
        // this.options = items.map(option => ({
        //     ...option, 
        //     price: ((Math.random() * 4) + 3).toFixed(2),
        //     recipe: JSON.parse(option["properties"]["Recipe"]["rich_text"][0] ? option["properties"]["Recipe"]["rich_text"][0]["text"]["content"] : null)
        // }));
        this.options = (await getItemsFromDatabase({})).map(option => ({
            ...option, 
            price: ((Math.random() * 4) + 3).toFixed(2),
            recipe: JSON.parse(option["properties"]["Recipe"]["rich_text"][0] ? option["properties"]["Recipe"]["rich_text"][0]["text"]["content"] : null)
        }));
        Object.keys(this.subTypes).map((page, i) => {
            Object.keys(this.subTypes[page]).map((type, j) => {
                if (this.subTypes[page][type]["subTypes"] == true) {
                    this.subTypes[page][type]["background"] = this.options.filter((option) => option["properties"]["Category"]["select"] && option["properties"]["Category"]["select"]["name"] == `${type}Background`).reduce((acc, subCat) => {
                        try {
                            acc[subCat["properties"]["Name"]["title"][0]["text"]["content"]] = JSON.parse(subCat["properties"]["Information"]["rich_text"][0]["text"]["content"]);
                        } catch {
                            console.log("Unable to parse background information");
                        }
                        return acc;
                    }, {});
                    this.subTypes[page][type]["items"] = this.options.filter((option) => option["properties"]["Category"]["select"] && option["properties"]["Category"]["select"]["name"] == type).reduce((acc, subCat) => {
                        if (!acc[subCat["properties"]["SubType"]["select"]["name"]]) {
                            acc[subCat["properties"]["SubType"]["select"]["name"]] = [];
                        }
                        let newSubCat = subCat;
                        let parentCat = this.options.filter((option) => option["properties"]["Category"]["select"]["name"] == `${type}Background` && option["properties"]["Name"]["title"][0]["text"]["content"] == subCat["properties"]["SubType"]["select"]["name"])[0];
                        if (subCat["properties"]["Temp"]["multi_select"].length == 0 && parentCat) {
                            newSubCat["properties"]["Temp"] = parentCat["properties"]["Temp"]
                        }
                        if (!subCat["properties"]["Shots"] && parentCat) {
                            newSubCat["properties"]["Shots"] = parentCat["properties"]["Shots"]
                        }
                        if (!subCat["recipe"] && parentCat) {
                            newSubCat["recipe"] = parentCat["recipe"]
                        }
                        acc[subCat["properties"]["SubType"]["select"]["name"]].push(newSubCat);
                        return acc;
                    }, {});
                } else {
                    this.subTypes[page][type]["items"] = this.options.filter((option) => option["properties"]["Category"]["select"] && option["properties"]["Category"]["select"]["name"] == type);
                }
            });
        });
        this.subTypes["Bases"]["Specialties"]["items"] = this.options.filter((option) => option["properties"]["Specialty"]["select"] && option["properties"]["Specialty"]["select"]["name"] == "yes")
        this.loading = false;
        console.log(this.subTypes["Bases"]["Misc"])
    }

    openInfoModal(type) {
        this.infoModalOpen = type;
    }

    closeInfoModal() {
        this.infoModalOpen = "";
    }

    openOrderModal(item) {
        this.orderItemSelection = item;
        if (item["properties"]["Temp"]["multi_select"].length > 1) {this.selectedTemp = "hot"};
        if (item["properties"]["Shots"]["select"]) {this.selectedNumShots = "single"}
        this.orderModalOpen = true;
    }

    closeOrderModal() {
        this.orderItemSelection = {};
        this.selectedTemp = "";
        this.selectedNumShots = "";
        this.orderModalOpen = false;
    }

    submitOrderFromModal() {
        console.log(this.selectedTemp)
        this.rootStore.receiptStore.addItem(this.orderItemSelection, this.selectedTemp, this.selectedNumShots);
        this.closeOrderModal();
    }

    needsSecondStep(item) {
        return item["properties"]["Temp"]["multi_select"].length > 1 || item["properties"]["Shots"]["select"];
    }

    selectTemp(e) {
        this.selectedTemp = e.target.value
    }

    selectNumShots(e) {
        this.selectedNumShots = e.target.value
    }

    clearOrder() {
        this.itemType = "Bases";
    }
}