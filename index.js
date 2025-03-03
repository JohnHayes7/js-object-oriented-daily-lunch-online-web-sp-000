// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood{
    constructor(name){
        this.name = name
        this.id = ++neighborhoodId

        store.neighborhoods.push(this);
    }

    deliveries(){
        return store.deliveries.filter(function(delivery){
            return delivery.neighborhoodId === this.id;
        }.bind(this));
    }

    customers(){
        return store.customers.filter(function(customer){
            return customer.neighborhoodId === this.id;
        }.bind(this));
    }

    meals(){
        let distinct
        this.customers().map(function(customer){
            let x = customer.meals();
            distinct = [...new Set(customer.meals())];
        });
        return  distinct
    }
}

class Meal{
    constructor(title, price){
        this.title = title; 
        this.price = price;
        this.id = ++mealId; 
        
        store.meals.push(this);
    };

    deliveries(){
        return store.deliveries.filter(function(delivery){
            return delivery.mealId === this.id;
        }.bind(this));
    }

    customers(){
        return this.deliveries().map(function(delivery){
            return delivery.customer();
        })
    }

    static byPrice(){
        return store.meals.sort(function(a, b) {return parseFloat(b.price) - parseFloat(a.price) });
    }
}

class Customer{
    constructor(name, neighborhoodId){
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        this.id = ++customerId;

        store.customers.push(this);
    }

    deliveries(){
        return store.deliveries.filter(function(delivery){
            return delivery.customerId === this.id;
        }.bind(this));
    }

    meals(){
        return this.deliveries().map(function(delivery){
            return delivery.meal();
            
        });
    }

   

    totalSpent(){
        return this.meals().reduce((total, m) => total += m.price, 0);
    }

}

class Delivery{
    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        this.id = ++deliveryId;

        store.deliveries.push(this);
    }

    meal(){
        return store.meals.find(function(meal){
            return this.mealId === meal.id;
        }.bind(this));
    }

    customer(){
        return store.customers.find(function(customer){
            return this.customerId === customer.id;
        }.bind(this));
    }

    neighborhood(){
        return store.neighborhoods.find(function(hood){
            return this.neighborhoodId === hood.id;
        }.bind(this));
    }

}