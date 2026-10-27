/**
 * Single source of truth for the four registration types.
 * Option codes here must match the reference tables created in
 * supabase/migrations/001_reset_registration_schema.sql.
 */

export type RegistrationType = 'animal' | 'visitor' | 'exhibitor' | 'sponsor';

export const REGISTRATION_TYPES: RegistrationType[] = ['animal', 'visitor', 'exhibitor', 'sponsor'];

/** Only these two produce a pass with a QR code. */
export const TYPES_WITH_PASS: RegistrationType[] = ['animal', 'visitor'];

export const TYPE_LABELS: Record<RegistrationType, { en: string; hi: string }> = {
    animal: { en: 'Animal for Pashu Mela', hi: 'पशु मेला के लिए पशु' },
    visitor: { en: 'Visitor', hi: 'आगंतुक' },
    exhibitor: { en: 'Exhibitor', hi: 'प्रदर्शक' },
    sponsor: { en: 'Sponsor', hi: 'प्रायोजक' },
};

/** Badge text printed on the pass. */
export const PASS_BADGE: Record<'animal' | 'visitor', string> = {
    animal: 'PASHU MELA',
    visitor: 'VISITOR',
};

export const ANIMAL_CATEGORIES = [
    { code: 'indigenous_cattle', en: 'Indigenous Cattle', hi: 'देशी गाय' },
    { code: 'exotic_cattle', en: 'Exotic Cattle', hi: 'विदेशी गाय' },
    { code: 'buffalo', en: 'Buffalo', hi: 'भैंस' },
] as const;

export const ANIMAL_BREEDS = [
    { code: 'gir', category: 'indigenous_cattle', en: 'Gir', hi: 'गिर' },
    { code: 'sahiwal', category: 'indigenous_cattle', en: 'Sahiwal', hi: 'साहीवाल' },
    { code: 'tharparkar', category: 'indigenous_cattle', en: 'Tharparkar', hi: 'थारपारकर' },
    { code: 'gangatiri', category: 'indigenous_cattle', en: 'Gangatiri', hi: 'गंगातीरी' },
    { code: 'elite_hf', category: 'exotic_cattle', en: 'Elite HF', hi: 'एलीट एचएफ' },
    { code: 'crossbred_hf', category: 'exotic_cattle', en: 'Crossbred HF', hi: 'क्रॉसब्रेड एचएफ' },
    { code: 'crossbred_jersey', category: 'exotic_cattle', en: 'Crossbred Jersey', hi: 'क्रॉसब्रेड जर्सी' },
    { code: 'buffalo', category: 'buffalo', en: 'Buffalo', hi: 'भैंस' },
] as const;

export const VISITOR_PROFESSIONS = [
    { code: 'farmer', en: 'Farmer', hi: 'किसान' },
    { code: 'student', en: 'Student', hi: 'विद्यार्थी' },
    { code: 'academia_research', en: 'Academia/Research', hi: 'शिक्षा/अनुसंधान' },
    { code: 'ngo', en: 'NGO', hi: 'एनजीओ' },
    { code: 'media', en: 'Media', hi: 'मीडिया' },
    { code: 'general_visitor', en: 'General visitor', hi: 'सामान्य आगंतुक' },
] as const;

export const breedsForCategory = (category: string) =>
    ANIMAL_BREEDS.filter(b => b.category === category);

export const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

export const MPO_LIST = [
    'Paayas MPO', 'Maahi MPO', 'Shreeja MPO', 'Baani MPO', 'Saahaj MPO',
    'Bapudham MPO', 'Sakhi MPO', 'Asha MPO', 'Shwetdhara MPO', 'Indujaa MPO',
    'Maalav MPO', 'Muktaa MPO', 'Kausheeki MPO', 'Ujalaa MPO', 'Harit Pradesh MPO',
    'Kashee MPO', 'Shri Baba Gorakhnath Kripaa MPO', 'Srijanee MPO',
    'Dudhshree MPO', 'Marathvarhad MPO', 'Vanamrita MPO', 'Asmita MPO',
    'Project Gir Varanasi',
];

/**
 * Sentinel for the "Other" option. Never stored — when chosen, the free-text
 * value the user types is what lands in animal_registrations.mpo_name.
 */
export const MPO_OTHER = '__other__';

/** Pass colours, taken from the approved pass artwork. */
export const PASS_THEME = {
    animal: {
        pageFrom: '#B4CE28',
        pageTo: '#6E7F17',
        badgeBg: '#D6E77E',
        badgeText: '#4A5A12',
    },
    visitor: {
        pageFrom: '#7FA8CE',
        pageTo: '#1F4F80',
        badgeBg: '#BBD8F2',
        badgeText: '#1B4B7A',
    },
} as const;
