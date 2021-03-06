let staysManager = (function () {

    class Stay {
        constructor(title, location, images, description, host = 'TEST', rating = 0, reviews = 0, stayType, nonAvailableDates = "1970-05-05 – 1970-05-09", guests, bedrooms, beds, price, enhancedCleaning = false, cancellationPolicy = CANCELLATION_POLICY, houseRules, amenities) {
            this.title = title || userModel.currentLoggedUser.fullName;
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
            this.allStays = JSON.parse(localStorage.getItem('allStays')) || stays;
        }
        
        addStay(obj = {}) {
            let stay = new Stay(obj.title, obj.location, obj.images, obj.description, obj.host, obj.rating, obj.reviews, obj.stayType, obj.nonAvailableDates, obj.guests, obj.bedrooms, obj.beds, obj.price, obj.enhancedCleaning, obj.cancellationPolicy, obj.houseRules, obj.amenities);
            stay.id = this.allStays.length + 1;
            staysManager.allStays.push(stay);
            localStorage.setItem('allStays', JSON.stringify(this.allStays));
            return stay;
        }
    }
    
    return new StaysManager();
})();
