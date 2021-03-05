let staysManager = (function () {
    class StaysManager {
        constructor() {
            this.allStays = [];
        }
        addStay() {

        }
    }
    return new StaysManager();
})();

stays.forEach(el => {
    let stay = new Stay(el.title, el.location, el.images, el.description, el.host, el.rating, el.reviews, el.stayType, el.nonAvailableDates, el.guests, el.bedrooms, el.baths, el.beds, el.price, el.enhancedCleaning, el.cancellationPolicy, el.houseRules, el.amenities);
    staysManager.allStays.push(stay);
});