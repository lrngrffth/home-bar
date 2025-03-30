import { makeAutoObservable } from "mobx"

export default class RecipePageStore {
    initialize() {
        this.drinks = [];
        this.currentDrink = 0;
        this.recipes = [];
    }

    constructor(rootStore) {
        this.initialize();
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    setDrink(drink) {
        this.currentDrink = drink
    }

    createRecipes(orders) {
        this.recipes = [];
        this.drinks=[];
        orders.map((drink, key) => {
            this.drinks.push("Drink #" + (key + 1));
            this.recipes[key] = {"Ingredients": {}, "Directions": {}}
            drink.map((item, i) => {
                if (item["info"]["recipe"]) {
                    let recipe = item["info"]["recipe"];
                    if (item["temp"]) {
                        recipe = recipe[item["temp"]];
                    }
                    if (item["numShots"]) {
                        recipe = recipe[item["numShots"]];
                    }
                    this.recipes[key]["Ingredients"][item["name"]] = recipe["Ingredients"];
                    this.recipes[key]["Directions"][item["name"]] = recipe["Directions"];
                } else {
                    if (!this.recipes[key]["Ingredients"]["Add Ons"]) {
                        this.recipes[key]["Ingredients"]["Add Ons"] = []
                    }
                    this.recipes[key]["Ingredients"]["Add Ons"].push(item["name"])
                }
            })
            if (Object.keys(this.recipes[key]["Ingredients"]).length > 1 || "Add Ons" in this.recipes[key]["Ingredients"]) {
                let toppings = drink.filter(item => item["type"] == "Toppings");
                toppings = toppings.map((item) => item["name"])
                console.log(toppings)
                let newBase = Object.keys(this.recipes[key]["Ingredients"])
                let index = newBase.indexOf("Add Ons");
                if (index > -1) { // Only remove if item is found
                    newBase.splice(index, 1);
                    newBase = newBase.concat(this.recipes[key]["Ingredients"]["Add Ons"].map((item, key) => item));
                }
                newBase = newBase.filter(ingredient => !toppings.includes(ingredient));
                let newBaseString = this.arrayToString(newBase);
                let toppingsString = this.arrayToString(toppings)
                this.recipes[key]["Directions"]["Combine"] = [];
                if (newBase.length > 1) {
                    this.recipes[key]["Directions"]["Combine"].push("Combine " + newBaseString + " as you see fit");
                }
                if (toppings.length > 0) {
                    this.recipes[key]["Directions"]["Combine"].push("Top with " + toppingsString);
                }
            }
        })

    }

    arrayToString(arr) {
        arr = arr.map(str => {
            return typeof str === 'string' ? str.toLowerCase() : str;
        });
        if (arr.length <= 1) {
          return arr.join('');
        } else if (arr.length === 2) {
          return arr.join(' and ');
        } else {
          const allButLast = arr.slice(0, -1).join(', ');
          const last = arr.slice(-1);
          return `${allButLast}, and ${last}`;
        }
    }

    clearRecipe() {
        this.drinks = [];
        this.recipes = [];
        this.currentDrink = 0;
    }

}