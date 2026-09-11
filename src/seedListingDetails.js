import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import {
  allListings,
  listingImages,
} from "./data/listingsData";

const seedListingDetails = async () => {
  try {
    for (const listing of allListings) {
      const priceMatch = listing.price?.match(/\$(\d+)/);
      const price = priceMatch ? Number(priceMatch[1]) : 0;

      const detailData = {
        title: listing.title,

        placeType: listing.title.includes("Room")
          ? "Private room"
          : "Entire home",

        guests: 4,
        bedrooms: 2,
        beds: 2,
        baths: 1,

        price: price,

        description:
          "Enjoy a comfortable and stylish stay. This welcoming property offers a relaxing space with convenient amenities for a memorable trip.",

        payToday: "Pay $0 today",
        cancellation: "Free cancellation",

        location: listing.location,
        rating: Number(listing.rating),
      hostName: [
  "Hassan",
  "Ali",
  "Ayesha",
  "Sarah",
  "Usman",
  "Emma",
][(listing.id - 1) % 6],

isSuperhost: listing.id % 3 !== 0,

hostingYears: 2 + (listing.id % 5),

hostResponseRate: 90 + (listing.id % 11),

hostResponseTime:
  listing.id % 3 === 0
    ? "Within an hour"
    : listing.id % 3 === 1
    ? "Within a few hours"
    : "Within a day",

hostBio:
  "I love welcoming guests and helping them have a comfortable and memorable stay.",

amenities: [
  "Fast WiFi",
  "Kitchen",
  "Free parking on premises",
  "58” smart TV",
  "Air conditioning",
  "Heating",
  "Washing machine",
  "Self check-in",
  "24/7 elevator",
  "UPS backup",
],

photoSections: listingImages[listing.id]
  ? listingImages[listing.id].map((image, index) => {
      const sectionTitles = [
        "Living room",
        "Kitchen",
        "Bedroom 1",
        "Bedroom 2",
        "Bathroom",
        "Exterior",
      ];

      return {
        title:
          sectionTitles[index] ||
          "Additional photos",
        imageIndex: index,
      };
    })
  : [],
highlights: [
  {
    icon: "🏆",
    title: "Top 10% of homes",
    description:
      "This home is highly ranked based on ratings, reviews, and reliability.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Perfect ratings from families",
    description:
      "Families who stayed here recently gave this home excellent ratings.",
  },
  {
    icon: "🛁",
    title: "Unwind in the hot tub",
    description:
      "Relax and enjoy a comfortable stay with a private space to unwind.",
  },
],

accessibilityFeatures: [
  {
    imageIndex: 2,
    title: "Guest entrance and parking",
    description: "Lit path to the guest entrance",
  },
],

ratingBreakdown: {
  cleanliness: 5,
  accuracy: 5,
  checkIn: 5,
  communication: 5,
  location: 4.8,
  value: 5,
},

reviewMentions: {
Hospitality: 43,
Cleanliness: 20,
Accuracy: 10,
Comfort: 12,
"Check-in": 6,
Location: 16,
Nearby: 8,
},


reviews: [
  {
    name: "Magdalena",
    initial: "M",
    subtitle: "10 years on Airbnb",
    time: "1 week ago",
    stay: "Stayed about a week",
    rating: 5,
    text: "I highly recommend staying at Hassan’s place. The apartment was just as described- clean and had everything you need for even longer stay. The host was very helpful, friendly and ...",
  },
  {
    name: "Shabaz",
    initial: "S",
    subtitle: "2 years on Airbnb",
    time: "2 weeks ago",
    stay: "Stayed one night",
    rating: 5,
    text: "Hassan was very responsive and helpful throughout my stay. He gave me great recommendations for local food spots and was always quick to respond whenever I had any questions ...",
  },
  {
    name: "Manan Ahmed",
    initial: "M",
    subtitle: "Sacramento, California",
    time: "2 weeks ago",
    stay: "Stayed a few nights",
    rating: 5,
    text: "Great apartment in a convenient location. The place was clean, comfortable and exactly what we expected. Everything was easy from check-in to checkout.",
  },
  {
    name: "Abdullah",
    initial: "A",
    subtitle: "3 months on Airbnb",
    time: "2 weeks ago",
    stay: "Stayed one night",
    rating: 5,
    text: "The apartment was very comfortable and clean. Communication with the host was excellent and the location made everything easy.",
  },
  {
    name: "Nishat",
    initial: "N",
    subtitle: "1 month ago",
    time: "1 month ago",
    stay: "Stayed a few nights",
    rating: 5,
    text: "A wonderful place for a short or long stay. The apartment was spotless and had everything we needed.",
  },
  {
    name: "James",
    initial: "J",
    subtitle: "3 months ago",
    time: "3 months ago",
    stay: "Stayed one night",
    rating: 5,
    text: "Wonderful experience. The place felt welcoming and had everything we needed. We would happily stay here again.",
  },
],


houseRules: [
  {
    icon: "🕒",
    text: "Check-in after 3:00 PM",
  },
  {
    icon: "🚪",
    text: "Checkout before 11:00 AM",
  },
  {
    icon: "👥",
    text: "2 guests maximum",
  },
  {
    icon: "🚭",
    text: "No smoking",
  },
],

safety: [
  {
    icon: "📹",
    text: "Security cameras on property",
  },
  {
    icon: "⚠️",
    text: "Carbon monoxide alarm",
  },
  {
    icon: "🔥",
    text: "Smoke alarm",
  },
],

cancellationDetails: {
  title: "Free cancellation before your stay.",
  description:
    "Review the cancellation policy for details about refunds and changes to your reservation.",
},

bedroomDetails: [
  {
    imageIndex: 0,
    name: "Bedroom 1",
    bed: "1 king bed",
  },
  {
    imageIndex: 1,
    name: "Bedroom 2",
    bed: "1 king bed",
  },
],

ratingDistribution: {
  5: 100,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
},

guestFavorite: listing.guestFavorite || false,

guestFavoriteText: listing.guestFavorite
  ? "One of the most loved homes on Airbnb based on ratings, reviews, and reliability."
  : "",
      };

      await setDoc(
        doc(db, "listingDetails", String(listing.id)),
        detailData,
        { merge: true }
      );

      console.log(
        `Listing ${listing.id} saved with price $${price}`
      );
    }

    console.log("✅ ALL LISTINGS SAVED TO FIREBASE");
  } catch (error) {
    console.error("❌ Error seeding listings:", error);
  }
};

seedListingDetails();