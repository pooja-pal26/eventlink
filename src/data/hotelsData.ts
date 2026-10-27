/**
 * Rangeelo - partner hotel list for the Accommodation page.
 *
 * GENERATED from "Hotels Data - Updated.xlsx" (13 hotels, Varanasi).
 * Tariff strings are reproduced VERBATIM from the sheet - they mix room types,
 * tax treatment and meal charges, so they are shown as given rather than
 * reformatted. Do not "tidy" them without checking the source.
 *
 * `fromPrice` is DERIVED: the lowest first-listed room rate across single/double
 * EP and CP, skipping any cell describing a per-meal or extra-bed charge. It is
 * an at-a-glance guide only - the tariff strings are authoritative.
 */

export type MealPlan = 'ep' | 'cp' | 'map' | 'ap';

/** Meal plan codes are hotel-trade jargon; the page renders this legend. */
export const MEAL_PLANS: { code: MealPlan; short: string; en: string; hi: string }[] = [
    { code: 'ep',  short: 'EP',  en: 'Room only',                 hi: 'केवल कमरा' },
    { code: 'cp',  short: 'CP',  en: 'Room + breakfast',          hi: 'कमरा + नाश्ता' },
    { code: 'map', short: 'MAP', en: 'Room + breakfast + 1 meal', hi: 'कमरा + नाश्ता + 1 भोजन' },
    { code: 'ap',  short: 'AP',  en: 'Room + all meals',          hi: 'कमरा + सभी भोजन' },
];

export type Tariff = Partial<Record<MealPlan, string>>;

export interface Hotel {
    id: number;
    name: string;
    stars: number;
    address: string;
    distanceKm: number;
    distanceLabel: string;
    single: Tariff;
    double: Tariff;
    triple: Tariff;
    contactPerson?: string;
    phones: string[];
    email?: string;
    website?: string;
    checkIn?: string;
    checkOut?: string;
    /** Derived - see file header. */
    fromPrice?: number;
}

export const HOTELS: Hotel[] = [
    {
        id: 1,
        name: "DoubleTree by Hilton Varanasi",
        stars: 5,
        address: "SA 2/320 Chhota Lalpur, Varanasi",
        distanceKm: 13.0,
        distanceLabel: "13 km",
        single: { cp: "Rs.7000+Taxes", map: "8500+Taxes", ap: "10500+Taxes" },
        double: { cp: "7500+Taxes", map: "9500+Taxes", ap: "12500+Taxes" },
        triple: { cp: "Extra Bed Rs.2500+Taxes", map: "Extra BedRs.3500+Taxes", ap: "Extra BedRs.4500+Taxes" },
        contactPerson: "Vinay Mishra",
        email: "salesmanager@dtbhvaranasi.com",
        website: "https://www.hilton.com/en/hotels/vnsdidi-doubletree-varanasi/",
        phones: ["9236464723"],
        fromPrice: 7000,
    },
    {
        id: 2,
        name: "Hotel Clarks Varanasi",
        stars: 5,
        address: "The Mall, Cantonment, Varanasi, Uttar Pradesh 221002",
        distanceKm: 15.0,
        distanceLabel: "15 km",
        single: { cp: "11000", map: "Breakfast would charge @ Rs 1,100 + 18% GST per person per day.. Lunch @ Rs 2,200 + 18% GST per person per day.. Dinner @ Rs 2,200 + 18% GST per person per day.." },
        double: { cp: "12000", map: "Breakfast would charge @ Rs 1,100 + 18% GST per person per day.. Lunch @ Rs 2,200 + 18% GST per person per day.. Dinner @ Rs 2,200 + 18% GST per person per day.." },
        triple: { map: "Breakfast would charge @ Rs 1,100 + 18% GST per person per day.. Lunch @ Rs 2,200 + 18% GST per person per day.. Dinner @ Rs 2,200 + 18% GST per person per day.." },
        contactPerson: "Abhishek",
        email: "sales@clarkshotels.com",
        website: "https://www.clarkshotels.com",
        phones: ["85286 66342"],
        fromPrice: 11000,
    },
    {
        id: 3,
        name: "Costa River Hotel",
        stars: 3,
        address: "Nepali Kothi, Cantonment, Varanasi",
        distanceKm: 15.0,
        distanceLabel: "15 km",
        single: { cp: "Superior Rs.4000+Taxes", map: "Superior Rs.5000+Taxes", ap: "Superior Rs.6000+Taxes" },
        double: { cp: "Superior Rs.4500+Taxes", map: "Superior Rs.5500+Taxes", ap: "Superior Rs.6500+Taxes" },
        triple: { cp: "Superior Rs.5500+Taxes", map: "Superior Rs.6500+Taxes", ap: "Superior Rs.7500+Taxes" },
        contactPerson: "Shreya",
        email: "info@costariver.com",
        website: "https://www.costariver.com/",
        checkIn: "1400 Hrs",
        checkOut: "1100 Hrs",
        phones: ["9519102003"],
        fromPrice: 4000,
    },
    {
        id: 4,
        name: "The Amayaa",
        stars: 4,
        address: "Mall Road, Cantonment, Varanasi",
        distanceKm: 15.0,
        distanceLabel: "15 km",
        single: {},
        double: { cp: "Superior Rs.6500+Taxes,Deluxe Rs.8000+Taxes", map: "Superior Rs.8500+Taxes,Deluxe Rs.10000+Taxes" },
        triple: {},
        contactPerson: "Abhishek Sharma",
        email: "sales@theamayaa.com",
        website: "https://www.theamayaa.com/",
        phones: ["9956082778"],
        fromPrice: 6500,
    },
    {
        id: 5,
        name: "Rivatas by Ideal",
        stars: 4,
        address: "Mall Road, Cantonment, Varanasi",
        distanceKm: 15.0,
        distanceLabel: "15 km",
        single: {},
        double: { cp: "Rs.7500+Taxes", map: "Rs.9500+Taxes" },
        triple: {},
        contactPerson: "Abhishek Sharma",
        email: "sales@theamayaa.com",
        website: "https://www.rivatas.com/",
        phones: ["9956082778"],
        fromPrice: 7500,
    },
    {
        id: 6,
        name: "Taj Ganges",
        stars: 5,
        address: "Nadesar, Varanasi",
        distanceKm: 10.0,
        distanceLabel: "10 km",
        single: { cp: "Superior Rs.13347+Taxes,Deluxe Rs.14368+Taxes,Luxury Rs.18525+Taxes", map: "Superior Rs.20646+Taxes,Deluxe Rs.22000+Taxes,Luxury Rs.27550+Taxes", ap: "Rs.Superior 22646+Taxes,Deluxe Rs.24000+Taxes,Luxury Rs.29550+Taxes" },
        double: { cp: "Superior Rs.14500+Taxes,Deluxe Rs.15500+Taxes,Luxury Rs.19525+Taxes", map: "Superior Rs.21596+Taxes,Deluxe Rs.22958+Taxes,Luxury Rs.28500+Taxes", ap: "Superior Rs.24596+Taxes,Deluxe Rs.26958+Taxes,Luxury Rs.32500+Taxes" },
        triple: { cp: "Superior Rs.16150+Taxes,Deluxe Rs.17218+Taxes,Luxury Rs.21375+Taxes", map: "Superior Rs.25333+Taxes,Deluxe Rs.26758+Taxes,Luxury Rs.32300+Taxes", ap: "Superior Rs.29333+Taxes,Deluxe Rs.30758+Taxes,Luxury Rs.36300+Taxes" },
        contactPerson: "Ayush Mishra",
        email: "m.ayush@tajhotels.com",
        website: "https://www.tajhotels.com/en-in/hotels/taj-ganges-varanasi",
        checkIn: "1400 Hrs",
        checkOut: "1200 Hrs",
        phones: ["8887948906"],
        fromPrice: 13347,
    },
    {
        id: 7,
        name: "Brij Hotels",
        stars: 5,
        address: "Varanasi",
        distanceKm: 9.0,
        distanceLabel: "9 km",
        single: { cp: "Nadhidhara Rs.23000+Taxes,Vasundhara Rs.33500+Taxes,Maharaja Suite Rs.64000+Taxes Meal 3000/per Person/day" },
        double: { cp: "Nadhidhara Rs.23000+Taxes,Vasundhara Rs.33500+Taxes,Maharaja Suite Rs.64000+Taxes,Meal 3000/Person/Day" },
        triple: {},
        contactPerson: "Jatin Dawar",
        email: "jatin.dawar@ihcltata.com",
        website: "https://www.brijhotels.com/",
        phones: ["9950694374"],
        fromPrice: 23000,
    },
    {
        id: 8,
        name: "Hotel Diamond",
        stars: 4,
        address: "Varanasi",
        distanceKm: 6.0,
        distanceLabel: "6 km",
        single: { cp: "Rs.5000+Taxes" },
        double: { cp: "Rs.5500+Taxes,Mea Charge Rs 800/Person" },
        triple: { cp: "Rs.6500+Taxes,Meal Charge Rs 800/Person" },
        contactPerson: "Rahul Srivastava",
        email: "diamotel@diamondhotel.co.in",
        website: "https://www.diamondhotel.co.in",
        phones: ["7706079568"],
        fromPrice: 5000,
    },
    {
        id: 9,
        name: "HERITAGE KASHINAAMA",
        stars: 5,
        address: "VARANASI",
        distanceKm: 3.0,
        distanceLabel: "3 km",
        single: { cp: "Superior Room Rs.3200 With Taxes ,Luxury Room Rs.4300 With Taxes ,Suite Room Rs.6600 With Taxes", map: "Superior Room Rs.3750 With Taxes ,Luxury Room Rs.4400 With Taxes ,Suite Room Rs.6500 With Taxes" },
        double: { cp: "Superior Room Rs.3200 With Taxes ,Luxury Room Rs.4300 With Taxes ,Suite Room Rs.6600 With Taxes", map: "Superior Room Rs.4250 With Taxes ,Luxury Room Rs.5250 With Taxes ,Suite Room Rs.7600 With Taxes" },
        triple: { cp: "For Extra Bed Superior Room Rs.1260 With Taxes ,Luxury Room Rs.1260 With Taxes ,Suite Room Rs.1260 With Taxes", map: "For Extra Bed-Superior Room Rs.1600 With Taxes ,Luxury Room Rs.1600 With Taxes ,Suite Room Rs.1650 With Taxes" },
        contactPerson: "Amresh Kumar Mishra",
        email: "lko.gshpl@gmail.com",
        website: "https://heritagekashinaama.com/",
        phones: ["9217062933"],
        fromPrice: 3200,
    },
    {
        id: 10,
        name: "Hotel Ozas Grand",
        stars: 3,
        address: "Infornt of BHU Truma Centre",
        distanceKm: 5.0,
        distanceLabel: "5 km",
        single: { ep: "Rs.2800 With Taxes", cp: "Rs.3360 With Taxes", map: "Rs.4350 With Taxes", ap: "Rs.5250 With Taxes" },
        double: { ep: "Rs.2800 With Taxes" },
        triple: {},
        contactPerson: "Hotel Ozas Grand",
        email: "hotelozasgrand@gmail.com",
        website: "https://www.hotelozasgrand.com",
        phones: ["08004932880", "08004932881"],
        fromPrice: 2800,
    },
    {
        id: 11,
        name: "Cocasa Boutique Hotel",
        stars: 4,
        address: "Near Assighat",
        distanceKm: 4.0,
        distanceLabel: "4 km",
        single: { cp: "Deluxe Room Rs.4000+Taxes,Studio Room (Suite) Rs.5000+Taxes", map: "Deluxe Room Rs.5000+Taxes,Studio Room (Suite) Rs.6000+Taxes", ap: "Deluxe Room Rs.6000+Taxes,Studio Room (Suite) Rs.7000+Taxes" },
        double: {},
        triple: { cp: "Deluxe Room & Studio Room (Suite) For Extra Bed Rs.1000 With Taxes", map: "Deluxe Room & Studio Room (Suite) For Extra Bed Rs.1500 With Taxes", ap: "Deluxe Room & Studio Room (Suite) For Extra Bed Rs.1800 With Taxes" },
        contactPerson: "Hotel Cocasa",
        email: "reservation@cocasa.co.in",
        website: "https://cocasa.co.in",
        phones: ["7388788873"],
        fromPrice: 4000,
    },
    {
        id: 12,
        name: "Pristine Hotel",
        stars: 4,
        address: "The Mall Road, Cantonment Varanasi",
        distanceKm: 15.0,
        distanceLabel: "15 km",
        single: { cp: "4000 + 5%", map: "850 Per Meal + 5% Tax", ap: "850 Per Meal + 5% Tax" },
        double: { cp: "4500 + 5%", map: "850 Per Meal + 5% Tax", ap: "850 Per Meal + 5% Tax" },
        triple: { cp: "Extra Bed Rs.2000+Taxes", map: "Per Meal 850" },
        contactPerson: "Vikrant/Vijay",
        email: "info@pristinehotel.in",
        website: "https://www.pristinehotel.in",
        phones: ["9532510999", "9532710999", "6389269534"],
        fromPrice: 4000,
    },
    {
        id: 13,
        name: "Hotel Regency",
        stars: 3,
        address: "GT Road, near Maruti Showroom, Andhrapull, Vijay Nagar Colony, Chetganj, Varanasi, Uttar Pradesh 221002",
        distanceKm: 4.1,
        distanceLabel: "4.1 km",
        single: {},
        double: { cp: "DOUBLE OCCUPANCY 3300/- + Tax" },
        triple: { map: "TRIPLE OCCUPANCY: 5000/+ tax" },
        email: "information@hotelregency.com",
        phones: ["85769 63345"],
        fromPrice: 3300,
    },
];
