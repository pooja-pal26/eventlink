import BSP_9813 from '@/assets/grandPashuMela/BSP_9813.JPG (1).jpeg';
import BSP_9817 from '@/assets/grandPashuMela/BSP_9817.JPG (1).jpeg';
import BSP_9823 from '@/assets/grandPashuMela/BSP_9823.JPG.jpeg';
import BSP_9833 from '@/assets/grandPashuMela/BSP_9833.JPG.jpeg';
import BSP_9846 from '@/assets/grandPashuMela/BSP_9846.JPG.jpeg';
import BSP_9864 from '@/assets/grandPashuMela/BSP_9864.JPG.jpeg';
import BSP_9882 from '@/assets/grandPashuMela/BSP_9882.JPG.jpeg';
import BSP_9891 from '@/assets/grandPashuMela/BSP_9891.JPG.jpeg';
import BSP_9907 from '@/assets/grandPashuMela/BSP_9907.JPG.jpeg';
import DEEP0164 from '@/assets/grandPashuMela/DEEP0164.JPG.jpeg';
import DEEP0171 from '@/assets/grandPashuMela/DEEP0171.JPG.jpeg';
import DEEP0186 from '@/assets/grandPashuMela/DEEP0186.JPG.jpeg';
import DEEP0197 from '@/assets/grandPashuMela/DEEP0197.JPG.jpeg';
import DEEP0198 from '@/assets/grandPashuMela/2.webp';
import DEEP0192 from '@/assets/grandPashuMela/DEEP0192.JPG.jpeg';
import crossbreed3 from '@/assets/grandPashuMela/WhatsApp Image 2026-03-10 at 1.27.31 PM.jpeg';

import Rathi1st from '@/assets/grandPashuMela/Rathi 1st rangeelo.png';
import Rathi2nd from '@/assets/grandPashuMela/Rathi 2nd Rangeelo.jpg.jpeg';
import Rathi3rd from '@/assets/grandPashuMela/Rathi 3rd Rangeelo.jpg.jpeg';

import Sahiwal1st from '@/assets/grandPashuMela/Sahiwal 1st rangeelo.jpg.jpeg';
import Sahiwal2nd from '@/assets/grandPashuMela/Sahiwal 2nd Rangeelo.jpg.jpeg';
import Sahiwal3rd from '@/assets/grandPashuMela/Sahiwal 3rd Rangeelo.jpg.jpeg';

// Note: Tharparkar 2nd is an mp4, we might not use it directly as an image in standard image tags, 
// using a placeholder image for it instead to prevent breakage, or we can use the default.
import Tharparkar1st from '@/assets/grandPashuMela/Tharparkar First.png';
import Tharparkar2ndVideo from '@/assets/grandPashuMela/Tharparkar 2nd rangeelo.mp4';
import Tharparkar2ndimage from '@/assets/grandPashuMela/image.png';

import Tharparkar3rd from '@/assets/grandPashuMela/Tharparkar 3rd Rangeelo.jpg.jpeg';

export type Winner = {
  rank: number;
  farmerName: string;
  location: string;
  yield: string; // Kg/24 Hours
  image: string;
  video?: string;
  description: string;
  quote?: string;
};

export type BreedCategory = {
  id: string;
  name: string;
  winners: Winner[];
};

export const pashuMelaData: BreedCategory[] = [
  {
    id: 'buffalo',
    name: 'Buffalo',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Basant',
        location: 'Bhiwani, Haryana',
        yield: '26.94 Kg',
        image: DEEP0197,
        description: "Murrah Buffalo Milking Record: 26.94 kg in 24 Hours\n\nAt Rangeelo 2026, Shri Basant from Bhiwani, Haryana claimed 1st Prize as his Murrah buffalo recorded an extraordinary daily milk yield. 🥇🐃\n\nThis achievement reflects how disciplined farm practices and proper scientific rearing can enhance milk production, reinforcing the breed's popularity as 'black gold' among dairy farmers.",
        quote: "Murrah Buffalo Milking Record: 26.94 kg in 24 Hours"
      },
      {
        rank: 2,
        farmerName: 'Shri Amandeep ji & Vedpal ji',
        location: 'Kakarod, Jind (Haryana)',
        yield: '20.76 Kg',
        image: DEEP0192,
        description: 'In the Buffalo category, the buffalo of Shri Amandeep ji & Vedpal ji, Kakarod, Jind (Haryana), earned 2nd position at Rangeelo 2026 with a solid 20.76 Kg in 24 hours.\n\nBehind this performance is a story of disciplined management and top-tier husbandry.'
      },
      {
        rank: 3,
        farmerName: 'Shri Yashveer ji',
        location: 'Jind',
        yield: '20.30 Kg',
        image: DEEP0186,
        description: 'Shri Yashveer ji (Jind) earned 3rd Prize in the Buffalo category with 20.30 kg in 24 hours.\n\nSolid management leads to solid results. Keep building on this success and watch your herd reach its peak in superior genetics.'
      }
    ]
  },
  {
    id: 'gangatiri',
    name: 'Gangatiri',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Dinesh Gurjar',
        location: 'Ajmer, Rajasthan',
        yield: '18.58 Kg',
        image: BSP_9846,
        description: 'At Rangeelo 2026 – Milking Competition, native breed excellence was on full display.\n\nIn the Gangatiri Category, an exceptional benchmark was established with 18.58 Kg total milk yield in 24 hours.\n\nHeartiest congratulations to Shri Dinesh Gurjar for winning 1st Prize and demonstrating the tremendous dairy potential of the Gangatiri breed.',
        quote: 'Native breed excellence with an 18.58 Kg record.'
      },
      {
        rank: 2,
        farmerName: 'Shri Ramesh Chandra Yadav',
        location: 'Kashi, Uttar Pradesh',
        yield: '16.40 Kg',
        image: BSP_9864,
        description: 'Congratulations to Shri Ramesh Chandra Yadav from Kashi for securing 2nd place in the Gangatiri category with an outstanding 16.40 Kg in 24 hours.\n\nYour dedication to indigenous cattle rearing and balanced nutrition is truly commendable.'
      },
      {
        rank: 3,
        farmerName: 'Shri Ram Naresh Singh',
        location: 'Mirzapur, Uttar Pradesh',
        yield: '15.20 Kg',
        image: BSP_9882,
        description: 'Securing 3rd Prize in the Gangatiri category, Shri Ram Naresh Singh (Mirzapur) recorded 15.20 kg in 24 hours.\n\nA great example of consistent herd care and dedication to native indigenous cows.'
      }
    ]
  },
  {
    id: 'sahiwal',
    name: 'Sahiwal',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Randeep Choudhary',
        location: 'Karnal, Haryana',
        yield: '22.36 Kg',
        image: Sahiwal1st,
        description: 'At Rangeelo 2026, the “Gold of India” once again demonstrated its strength in dairy production.\n\nCongratulations to Shri Randeep Choudhary from Karnal, Haryana for securing 1st Prize in the Sahiwal category with a yield of 22.36 kg in 24 hours.\n\nConsistent herd management and disciplined dairy practices remain the foundation behind such performances.',
        quote: 'The "Gold of India" once again demonstrated its strength.'
      },
      {
        rank: 2,
        farmerName: 'Shri Naresh Kumar',
        location: 'Taraori, Karnal (Haryana)',
        yield: '19.18 Kg',
        image: Sahiwal2nd,
        description: 'At the Rangeelo 2026 competition, a Sahiwal cow owned by Shri Naresh Kumar of Taraori, Karnal (Haryana), earned a prestigious 2nd place. The cow produced an impressive 19.18 Kg within a 24-hour period.\n\nA proud showcase of the true strength of the Sahiwal breed, reflecting the rich dairy legacy of the Rajasthan–Haryana region.'
      },
      {
        rank: 3,
        farmerName: 'Shri Radheshyam Jat ji',
        location: 'Alwar',
        yield: '18.96 Kg',
        image: Sahiwal3rd,
        description: 'In the Sahiwal category at Rangeelo 2026 Milking Competition, the cow of Shri Radheshyam Jat ji (Alwar) secured 3rd Prize with a total yield of 18.96 kg in 24 hours.\n\nA clear reflection of disciplined milking and balanced feeding. You’ve mastered the basics—now keep refining the details to reach the top tier.'
      }
    ]
  },
  {
    id: 'gir',
    name: 'Gir',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Mukesh Kumar Choudhary',
        location: 'Tihari, Ajmer',
        yield: '26.88 Kg',
        image: BSP_9833,
        description: 'Huge congratulations to Shri Mukesh Kumar Choudhary from Tihari, Ajmer for a historic performance at the Rangeelo 2026 Milking Competition.\n\nHis Gir cow recorded 26.88 kg of milk in 24 hours—securing the 1st Prize and establishing a new record in the Gir category pan-India!\n\nThis achievement shows how scientific management can elevate the performance of indigenous breeds.',
        quote: 'Establishing a new record in the Gir category pan-India!'
      },
      {
        rank: 2,
        farmerName: 'Shri Ganpat Singh Shekhawat ji',
        location: 'Kayad, Ajmer',
        yield: '26.14 Kg',
        image: BSP_9823,
        description: 'Congratulations to Shri Ganpat Singh Shekhawat ji, Kayad, Ajmer, for winning 2nd prize in the Gir category with 26.14 Kg total yield.\n\nA well-deserved second-place win! Your continuous effort and expert animal management are clearly reflected in this proud achievement.'
      },
      {
        rank: 3,
        farmerName: 'Shri Avinash Singh Shekhawat ji',
        location: 'Kayad, Ajmer',
        yield: '20.08 Kg',
        image: BSP_9817,
        description: 'Congratulations to Shri Avinash Singh Shekhawat ji (Kayad, Ajmer) for securing 3rd Prize in the Gir category with 20.08 kg in 24 hours.\n\nYour dedication to routine is clearly paying off. Keep pushing; your herd is on the path to the reach the next level.'
      }
    ]
  },
  {
    id: 'tharparkar',
    name: 'Tharparkar',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Balveer Karesiya',
        location: 'Jaitaran, Rajasthan',
        yield: '13.30 Kg',
        image: Tharparkar1st, 
        description: 'At Rangeelo 2026 – Milking Competition, adaptability and productivity were clearly visible.\n\nIn the Tharparkar category, the winning cow recorded 13.30 Kg total milk yield in 24 hours.\n\nCongratulations to Shri Balveer Karesiya (Jaitaran, Rajasthan) for securing 1st Prize and highlighting the strength of Tharparkar cattle.',
        quote: 'Adaptability and productivity were clearly visible.'
      },
      {
        rank: 2,
        farmerName: 'Shri Harshit Jhuriya ji',
        location: 'Sikar',
        yield: '12.88 Kg',
        image: Tharparkar2ndimage,
        description: 'Shri Harshit Jhuriya ji, Sikar, secured 2nd place in the Tharparkar category at Rangeelo 2026 with 12.88 Kg total yield.\n\nCareful attention and steady routine helped achieve this proud milestone.'
      },
      {
        rank: 3,
        farmerName: 'Shri Udaypal ji',
        location: 'Rajasthan',
        yield: '9.50 Kg',
        image: Tharparkar3rd,
        description: 'Securing 3rd Prize in the Tharparkar category, Shri Udaypal ji recorded 9.50 kg in 24 hours.\n\nStrong discipline in milking routine and feeding has clearly paid off.\n\nThis 3rd place finish is a solid stepping stone — keep building the momentum and continue strengthening your herd with better genetics.'
      }
    ]
  },
  {
    id: 'hycb',
    name: 'HYCB',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Dinesh Gurjar',
        location: 'Ajmer, Rajasthan',
        yield: '34.62 Kg',
        image: DEEP0198,
        description: 'At Rangeelo 2026 – Milking Competition, excellence in high-yield cross-breed productivity took center stage.\n\nIn the HYCB Category, a remarkable benchmark was set as the winning cow recorded an outstanding 34.62 Kg total milk yield in 24 hours.\n\nHeartiest congratulations to Shri Dinesh Gurjar from Ajmer, Rajasthan for securing 1st Prize with this exceptional record performance.',
        quote: 'Outstanding 34.62 Kg total milk yield in 24 hours.'
      },
      {
        rank: 2,
        farmerName: 'Shri Gagan Singh',
        location: 'Ajmer',
        yield: '31.20 Kg',
        image: crossbreed3,
        description: 'Congratulations to Shri Gagan Singh from Ajmer for securing 2nd place in the HYCB category with a stellar 31.20 Kg in 24 hours.\n\nThis success is a direct result of meticulous herd care, consistent management, and dedication.'
      },
      {
        rank: 3,
        farmerName: 'Shri Om Prakash ji',
        location: 'Ashok Nagar, Ajmer',
        yield: '28.50 Kg',
        image: DEEP0164,
        description: 'Congratulations to Shri Om Prakash ji, Ashok Nagar, Ajmer, for securing 3rd place in the HYCB category at Rangeelo 2026 with 28.50 Kg in 24 hours.\n\nYour disciplined approach to daily care and feeding has delivered fantastic results.'
      }
    ]
  },
  {
    id: 'jycb',
    name: 'JYCB',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Naresh Kumar',
        location: 'Kaithal, Haryana',
        yield: '32.10 Kg',
        image: BSP_9907,
        description: "The JYCB category at this year's Milking Competition at Rangeelo 2026 set a high standard for productivity and focused herd management.\n\n• Winner: Shri Naresh Kumar (Kaithal, Haryana)\n• Yield: 32.10 Kg (Total 24-hour yield)\n\nCongratulations to Shri Naresh Kumar for this 1st Prize victory in the JYCB category.",
        quote: 'Set a high standard for productivity in JYCB category.'
      },
      {
        rank: 2,
        farmerName: 'Smt. Geeta Devi',
        location: 'Nawalgarh, Jhunjhunu',
        yield: '26.68 Kg',
        image: BSP_9891,
        description: "Representing Nawalgarh, Jhunjhunu, Smt. Geeta Devi's JYCB cow secured a prestigious second place at Rangeelo 2026, clocking an impressive 24-hour yield of 26.68 Kg.\n\nThis success is a direct result of dedication to quality feeding and daily care."
      },
      {
        rank: 3,
        farmerName: 'Shri Mangiram ji',
        location: 'Hanumangarh',
        yield: '25.02 Kg',
        image: DEEP0171,
        description: 'Securing 3rd Prize in the JYCB category, Shri Mangiram ji (Hanumangarh) recorded 25.02 kg in 24 hours.\n\nA brilliant reflection of hard work and superior genetics.'
      }
    ]
  }
];

export const galleryImages = [
  BSP_9813, BSP_9817, BSP_9823, BSP_9833, BSP_9846, BSP_9864, BSP_9882, BSP_9891, BSP_9907,
  DEEP0164, DEEP0171, DEEP0186,
  Rathi1st, Rathi2nd, Rathi3rd,
  Sahiwal1st, Sahiwal2nd, Sahiwal3rd,
  Tharparkar3rd
];
