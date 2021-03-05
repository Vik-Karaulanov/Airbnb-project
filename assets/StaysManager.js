let staysManager = (function () {

    class Stay {
        constructor(title, location, images, description, host = 'TEST', rating = 0, reviews = 0, stayType, nonAvailableDates = 'TestData', guests, bedrooms, baths, beds, price, enhancedCleaning = false, cancellationPolicy = CANCELLATION_POLICY, houseRules, amenities) {
            this.title = title || 'Custom user place';
            this.location = location;
            this.images = images;
            this.description = description;
            this.host = host;
            this.rating = rating;
            this.reviews = reviews;
            this.stayType = stayType;
            this.nonAvailableDates = nonAvailableDates;
            this.guests = guests;
            this.bedrooms = bedrooms;
            this.baths = baths;
            this.beds = beds;
            this.price = price;
            this.enhancedCleaning = enhancedCleaning;
            this.cancellationPolicy = cancellationPolicy;
            this.houseRules = houseRules;
            this.amenities = amenities;
        }
    }

    class StaysManager {
        constructor() {
            this.allStays = [];
        }
        addStay(obj = {}) {
            let stay = new Stay(obj.title, obj.location, obj.images, obj.description, obj.host, obj.rating, obj.reviews, obj.stayType, obj.nonAvailableDates, obj.guests, obj.bedrooms, obj.baths, obj.beds, obj.price, obj.enhancedCleaning, obj.cancellationPolicy, obj.houseRules, obj.amenities);
            staysManager.allStays.push(stay);
            return stay;
        }
    }
    
    return new StaysManager();
})();

stays.forEach(el => staysManager.addStay(el));