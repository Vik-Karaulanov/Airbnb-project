class Stay {
    constructor (title = 'Cosy atmosphere with a scent of luxury', location, images, description, host, rating = 5, reviews = 4, stayType, nonAvailableDates, guests, bedrooms, baths, beds, price, enhancedCleaning, cancellationPolicy, houseRules, amenities) {
        this.title = title;
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