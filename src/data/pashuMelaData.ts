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

import Tharparkar1st from '@/assets/grandPashuMela/Tharparkar First.png';
import Tharparkar2ndVideo from '@/assets/grandPashuMela/Tharparkar 2nd rangeelo.mp4';
import Tharparkar2ndimage from '@/assets/grandPashuMela/image.png';
import Tharparkar3rd from '@/assets/grandPashuMela/Tharparkar 3rd Rangeelo.jpg.jpeg';

// Kashi Images (converted to optimized WebP from exact camera names in grandPashuMela):
// HFCB
import DineshStage from '@/assets/grandPashuMela/Dinesh_Moment_of_Glory.webp';
import AbhishekStage from '@/assets/grandPashuMela/Abhishek_Pandey_MOG.webp';
import VishalStage from '@/assets/grandPashuMela/Vishal_Yadav_MOG.webp';

// JYCB
import GaganSinghMOG from '@/assets/grandPashuMela/Gagan_Singh_MOG.webp';
import RavindraMOG from '@/assets/grandPashuMela/Ravindra_MOG.webp';
import RajeevKumarMOG from '@/assets/grandPashuMela/Rajeev_Kumar_MOG.webp';

// Gir
import VinodMOG from '@/assets/grandPashuMela/Vinod_MOG.webp';
import RamjagausiMOG from '@/assets/grandPashuMela/Ramjagausi_MOG.webp';
import OmprakashMOG from '@/assets/grandPashuMela/Omprakash_MOG.webp';

// Buffalo (Murrah)
import GudduMOG from '@/assets/grandPashuMela/Guddu_MOG.webp';
import RambirMOG from '@/assets/grandPashuMela/Rambir_MOG.webp';
import MohdRashidMOG from '@/assets/grandPashuMela/Mohd_Rashid_MOG.webp';

// Sahiwal
import NavdeepMOG from '@/assets/grandPashuMela/Navdeep_MOG.webp';
import SanjayMauryaMOG from '@/assets/grandPashuMela/Sanjay_Maurya_MOG.webp';
import AnilYadavMOG from '@/assets/grandPashuMela/Anil_Yadav_MOG.webp';

// Gangatiri
import PrahladSinghMOG from '@/assets/grandPashuMela/Prahlad_Singh_MOG.webp';
import GorakhnathYadavMOG from '@/assets/grandPashuMela/Gorakhnath_Yadav_MOG.webp';
import HarimohanYadavMOG from '@/assets/grandPashuMela/Harimohan_Yadav_MOG.webp';

// Tharparkar (Kashi)
import PriyanshuMOG from '@/assets/grandPashuMela/Priyanshu_MOG.webp';
import RandeepMOG from '@/assets/grandPashuMela/Randeep_MOG.webp';

export type Winner = {
  rank: number;
  farmerName: string;
  location: string;
  yield: string; // Kg/24 Hours or Litres
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

// ==========================================
// KASHI PASHU MELA DATA (STANDALONE DATASET)
// ==========================================
export const kashiPashuMelaData: BreedCategory[] = [
  {
    id: 'hfcb',
    name: 'HFCB',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Dinesh Gurjar',
        location: 'Ajmer, Rajasthan',
        yield: '34.62 Kg',
        image: DineshStage,
        description: '34.62 kg of milk in 24 hours — a winning performance at Rangeelo Kashi 2026!\n\nShri Dinesh Gurjar from Ajmer, Rajasthan, secured 1st Prize in the HFCB Category of the Milking Competition. His achievement highlights the role of sound breeding practices, balanced nutrition, and effective herd management in enhancing dairy productivity.\n\n#Rangeelo2026 #MilkingCompetition #DairyProductivity #HFCB #ProgressiveDairying #DairyFarmers #NDSRangeeloKashi',
        quote: 'Setting the standard in high-yield crossbreed dairying.'
      },
      {
        rank: 2,
        farmerName: 'Shri Abhishek Pandey',
        location: 'Ghazipur, Uttar Pradesh',
        yield: '30.50 Kg',
        image: AbhishekStage,
        description: 'Recognising another impressive performance at Rangeelo Kashi 2026!\n\nCongratulations to Shri Abhishek Pandey from Ghazipur, Uttar Pradesh for securing 2nd Prize in the HFCB Category of the Milking Competition with a 24-hour milk yield of 30.50 kg.\n\n#Rangeelo2026 #MilkingCompetition #DairyProductivity #HFCB #ProgressiveDairying #DairyFarmers #NDSRangeeloKashi'
      },
      {
        rank: 3,
        farmerName: 'Shri Vishal Yadav',
        location: 'Uttar Pradesh',
        yield: '28.24 Kg',
        image: VishalStage,
        description: 'A commendable achievement at Rangeelo Kashi 2026!\n\nCongratulations to Shri Vishal Yadav for securing 3rd Prize in the HFCB Category of the Milking Competition, recording a 24-hour milk yield of 28.24 kg.\n\nConsistent animal care and disciplined farm management are key to sustaining productivity and achieving better results.\n\n#Rangeelo2026 #MilkingCompetition #DairyProductivity #HFCB #ProgressiveDairying #DairyFarmers #NDSRangeeloKashi'
      }
    ]
  },
  {
    id: 'jycb',
    name: 'JYCB',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Gagan Singh',
        location: 'Ajmer, Rajasthan',
        yield: '28.99 Kg',
        image: GaganSinghMOG,
        description: '28.99 kg in 24 hours—a championship-winning performance!\n\nShri Gagan Singh from Ajmer secured 1st Prize in the Jersey Crossbreed category at the Rangeelo Kashi 2026 Milking Competition, delivering an outstanding performance that set the benchmark for the category.\n\nMeticulous animal care, consistent herd management, and unwavering dedication made this winning yield possible.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #CrossBreed #ProgressiveDairying #CBJY #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi',
        quote: 'A testament to consistency and Jersey crossbreed performance.'
      },
      {
        rank: 2,
        farmerName: 'Shri Ravindra ji',
        location: 'Uttar Pradesh',
        yield: '25.00 Kg',
        image: RavindraMOG,
        description: 'Congratulations to Shri Ravindra ji on securing 2nd Prize in the Jersey Crossbreed category at Rangeelo Kashi 2026, with an impressive milk yield of 25 kg in 24 hours.\n\nCredit goes to a disciplined approach to daily animal care, balanced feeding, and consistent farm management.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #CrossBreed #ProgressiveDairying #CBJY #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi'
      },
      {
        rank: 3,
        farmerName: 'Shri Rajiv Kumar',
        location: 'Varanasi, Uttar Pradesh',
        yield: '15.90 Kg',
        image: RajeevKumarMOG,
        description: 'Shri Rajiv Kumar from Varanasi secured 3rd Prize in the Jersey Crossbreed category at the Rangeelo Kashi Milking Competition 2026, recording a milk yield of 15.9 kg in 24 hours.\n\nThis commendable finish reflects his consistent effort, disciplined routines, and commitment to effective farm management.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #CrossBreed #ProgressiveDairying #CBJY #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi'
      }
    ]
  },
  {
    id: 'gir',
    name: 'Gir',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Vinod',
        location: 'Jind, Haryana',
        yield: '17.64 Kg',
        image: VinodMOG,
        description: 'A proud first-place finish for Shri Vinod from Jind at the Rangeelo Kashi 2026 Milking Competition!\n\nHis Gir cow secured 1st Prize with an impressive milk yield of 17.64 kg in 24 hours.\n\nThe result highlights how scientific management can strengthen the productivity of indigenous breeds.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #Gir #ProgressiveDairying #Indigenous #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi',
        quote: 'Demonstrating the true milk potential of indigenous Gir cattle.'
      },
      {
        rank: 2,
        farmerName: 'Shri Ramjaguasi Radha Kishan',
        location: 'Varanasi, Uttar Pradesh',
        yield: '17.00 Kg',
        image: RamjagausiMOG,
        description: 'Congratulations to Shri Ramjaguasi Radha Kishan from Varanasi on securing 2nd Prize in the Gir category with a total milk yield of 17 kg.\n\nThis well-earned second-place finish reflects consistent effort and skilful cattle management.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #Gir #ProgressiveDairying #Indigenous #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi'
      },
      {
        rank: 3,
        farmerName: 'Shri Omprakash',
        location: 'Ajmer, Rajasthan',
        yield: '12.80 Kg',
        image: OmprakashMOG,
        description: 'Shri Omprakash from Ajmer secured 3rd Prize in the Gir category, recording a milk yield of 12.80 kg in 24 hours.\n\nHis consistent routine is delivering results and provides a strong foundation for further improvement.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #Gir #ProgressiveDairying #Indigenous #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi'
      }
    ]
  },
  {
    id: 'buffalo',
    name: 'Buffalo',
    winners: [
      {
        rank: 1,
        farmerName: 'Guddu Bhai',
        location: 'Uttar Pradesh',
        yield: '26.94 Kg',
        image: GudduMOG,
        description: 'A standout performance by the Murrah breed at Rangeelo Kashi 2026!\n\nCongratulations to Guddu Bhai on securing 1st Prize in the Murrah category of the Milking Competition with a top yield of 26.94 kg in 24 hours.\n\nScientific rearing, balanced feeding, and sound farm management continue to unlock the full milk potential of this remarkable breed.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #Murrah #ProgressiveDairying #Buffalo #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi',
        quote: 'Highlighting strength and productivity in Murrah herd management.'
      },
      {
        rank: 2,
        farmerName: 'Shri Rambir ji',
        location: 'Kaithal, Haryana',
        yield: '23.18 Kg',
        image: RambirMOG,
        description: 'Shri Rambir ji from Kaithal secured 2nd Prize in the Murrah category at Rangeelo Kashi 2026, with a milk yield of 23.18 kg in 24 hours.\n\nThis performance reflects disciplined farm management and high standards of animal care.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #Murrah #ProgressiveDairying #Buffalo #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi'
      },
      {
        rank: 3,
        farmerName: 'Mohd. Rashad Ali',
        location: 'Uttar Pradesh',
        yield: '22.32 Kg',
        image: MohdRashidMOG,
        description: 'Mohd. Rashad Ali secured 3rd Prize in the Murrah category with a 24-hour milk yield of 22.32 kg.\n\nSound herd management has delivered encouraging results, providing a strong foundation for further gains through improved genetics.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #Murrah #ProgressiveDairying #Buffalo #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi'
      }
    ]
  },
  {
    id: 'sahiwal',
    name: 'Sahiwal',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Navdeep Choudhary',
        location: 'Karnal, Haryana',
        yield: '18.08 Kg',
        image: NavdeepMOG,
        description: 'The “Gold of India” showcased its dairy potential at Rangeelo Kashi 2026.\n\nCongratulations to Shri Navdeep Choudhary of Karnal, Haryana, whose Sahiwal cow secured 1st Prize in the category with a 24-hour milk yield of 18.08 kg.\n\nConsistent herd management and disciplined dairy practices laid the foundation for this winning performance.\n\n#Rangeelo2026 #MilkingCompetition #Sahiwal #IndigenousBreed #DairyFarming #FarmerPride #NDSRangeeloKashi',
        quote: 'Reflecting the natural excellence of native Sahiwal genetics.'
      },
      {
        rank: 2,
        farmerName: 'Shri Sanjay Kumar Maurya',
        location: 'Uttar Pradesh',
        yield: '17.22 Kg',
        image: SanjayMauryaMOG,
        description: 'Shri Sanjay Kumar Maurya’s Sahiwal cow earned 2nd Prize at Rangeelo Kashi 2026, producing 17.22 kg of milk in 24 hours.\n\nA strong testament to the productivity and resilience of the Sahiwal breed.\n\n#Rangeelo2026 #MilkingCompetition #Sahiwal #IndigenousBreed #DairyFarming #FarmerPride #NDSRangeeloKashi'
      },
      {
        rank: 3,
        farmerName: 'Shri Anil Kumar Yadav',
        location: 'Uttar Pradesh',
        yield: '14.00 Kg',
        image: AnilYadavMOG,
        description: 'Shri Anil Kumar Yadav’s cow secured 3rd Prize in the Sahiwal category at the Rangeelo Kashi 2026 Milking Competition, producing 14 kg of milk in 24 hours.\n\nDisciplined milking and balanced feeding have delivered encouraging results, creating a strong foundation for further improvement.\n\n#Rangeelo2026 #MilkingCompetition #Sahiwal #IndigenousBreed #DairyFarming #FarmerPride #NDSRangeeloKashi'
      }
    ]
  },
  {
    id: 'tharparkar',
    name: 'Tharparkar',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Priyanshu Rathi',
        location: 'Haryana',
        yield: '15.92 Kg',
        image: PriyanshuMOG,
        description: 'At Rangeelo Kashi 2026 – Milking Competition, adaptability and productivity were clearly visible.\n\nIn the Tharparkar category, the winning cow recorded 15.92 Kg total milk yield in 24 hours.\n\nCongratulations to Shri Priyanshu Rathi for securing 1st Prize and highlighting the strength of Tharparkar cattle.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #Tharparkar\n#ProgressiveDairying #Indigenous #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi',
        quote: 'Showcasing adaptability and sustainable yield in Tharparkar dairying.'
      },
      {
        rank: 2,
        farmerName: 'Shri Randeep Chaudhary',
        location: 'Haryana',
        yield: '10.80 Kg',
        image: RandeepMOG,
        description: 'Shri Randeep Chaudhary, secured 2nd place in the Tharparkar category at Rangeelo 2026 with 10.80 Kg total yield.\n\nCareful attention and steady routine helped achieve this proud milestone.\n\n#Rangeelo2026 #MilkingCompetition #DairyExcellence #Tharparkar\n#ProgressiveDairying #Indigenous #Cow #Breed #DairyFarmer #Farmer #NDSRangeeloKashi'
      }
    ]
  },
  {
    id: 'gangatiri',
    name: 'Gangatiri',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Praladh Singh',
        location: 'Uttar Pradesh',
        yield: '18.58 Litres',
        image: PrahladSinghMOG,
        description: 'A proud win for the Gangatiri breed at Rangeelo Kashi 2026!\n\nCongratulations to Shri Praladh Singh, who secured 1st Prize in the Gangatiri Category of the Milking Competition with a 24-hour milk yield of 18.58 litres.\n\nThe result demonstrates the potential of indigenous breeds supported by sound breeding, balanced nutrition, and consistent animal care.\n\n#Rangeelo2026 #MilkingCompetition #Gangatiri #IndigenousBreeds #DairyProductivity #ProgressiveDairying #DairyFarmers #NDSRangeeloKashi',
        quote: 'Unlocking the traditional strength and efficiency of Gangatiri breeds.'
      },
      {
        rank: 2,
        farmerName: 'Shri Gorakhnath Yadav',
        location: 'Uttar Pradesh',
        yield: '17.28 Litres',
        image: GorakhnathYadavMOG,
        description: 'A strong showing for indigenous dairying at Rangeelo Kashi 2026!\n\nShri Gorakhnath Yadav earned 2nd Prize in the Gangatiri Category of the Milking Competition, recording 17.28 litres of milk in 24 hours.\n\nSteady animal care and feeding practices continue to strengthen the productivity of indigenous breeds.\n\n#Rangeelo2026 #MilkingCompetition #Gangatiri #IndigenousBreeds #DairyProductivity #ProgressiveDairying #DairyFarmers #NDSRangeeloKashi'
      },
      {
        rank: 3,
        farmerName: 'Shri Harimohan Yadav',
        location: 'Uttar Pradesh',
        yield: '10.68 Litres',
        image: HarimohanYadavMOG,
        description: 'Recognising an achievement in the Gangatiri category at Rangeelo Kashi 2026!\n\nShri Harimohan Yadav secured 3rd Prize in the Gangatiri Category of the Milking Competition, recording a 24-hour milk yield of 10.68 litres.\n\nConsistent animal care and balanced nutrition provide a strong foundation for improving the productivity of indigenous breeds.\n\n#Rangeelo2026 #MilkingCompetition #Gangatiri #IndigenousBreeds #DairyProductivity #ProgressiveDairying #DairyFarmers #NDSRangeeloKashi'
      }
    ]
  }
];

// ==========================================
// JAIPUR PASHU MELA DATA (STANDALONE DATASET)
// ==========================================
export const jaipurPashuMelaData: BreedCategory[] = [
  {
    id: 'hf',
    name: 'HF (Holstein Friesian)',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Pawan',
        location: 'Hisar, Haryana',
        yield: '64.44 Kg',
        image: DEEP0198,
        description: 'At Rangeelo 2026 – Milking Competition, an extraordinary milestone was recorded in the HF (Holstein Friesian) category as the winning cow produced 64.44 Kg of milk in 24 hours.\n\nHeartiest congratulations to Shri Pawan from Hisar, Haryana for winning 1st Prize and setting a benchmark in dairy productivity.\n\n#Rangeelo2026 #MilkingCompetition #DairyProductivity #HF #HolsteinFriesian #ProgressiveDairying #DairyFarmers',
        quote: 'Setting a pan-India dairy benchmark with 64.44 Kg milk in 24 hours.'
      },
      {
        rank: 2,
        farmerName: 'Shri Jagdish ji',
        location: 'Hisar, Haryana',
        yield: '61.34 Kg',
        image: DEEP0164,
        description: 'Congratulations to Shri Jagdish ji from Hisar, Haryana for securing 2nd place in the HF category with an impressive 61.34 Kg in 24 hours.\n\n#Rangeelo2026 #MilkingCompetition #DairyProductivity #HF #ProgressiveDairying #DairyFarmers'
      },
      {
        rank: 3,
        farmerName: 'Shri Jagdish Kumar ji',
        location: 'Hisar, Haryana',
        yield: '58.94 Kg',
        image: DEEP0171,
        description: 'Securing 3rd Prize in the HF category, Shri Jagdish Kumar ji (Hisar, Haryana) recorded an outstanding 58.94 kg in 24 hours.\n\n#Rangeelo2026 #MilkingCompetition #DairyProductivity #HF #ProgressiveDairying #DairyFarmers'
      }
    ]
  },
  {
    id: 'crossbreed',
    name: 'Cross Breed',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Tara Chand',
        location: 'Ajmer, Rajasthan',
        yield: '49.10 Kg',
        image: crossbreed3,
        description: 'Excellence and dedication at Rangeelo 2026! Heartiest congratulations to Shri Tara Chand from Ajmer for securing 1st Prize in the Cross Breed category with 49.10 Kg milk yield in 24 hours.\n\n#Rangeelo2026 #MilkingCompetition #DairyProductivity #CrossBreed #ProgressiveDairying #DairyFarmers',
        quote: 'Excellence in Cross Breed dairying with 49.10 Kg yield.'
      },
      {
        rank: 2,
        farmerName: 'Shri Ram Lal ji',
        location: 'Kayad, Ajmer',
        yield: '22.52 Kg',
        image: BSP_9846,
        description: 'Congratulations to Shri Ram Lal ji from Kayad, Ajmer for securing 2nd place in the Cross Breed category with 22.52 Kg at Rangeelo 2026.\n\n#Rangeelo2026 #MilkingCompetition #CrossBreed #ProgressiveDairying'
      },
      {
        rank: 3,
        farmerName: 'Shri Shyam Lal ji',
        location: 'Kayad, Ajmer',
        yield: '22.40 Kg',
        image: DEEP0164,
        description: 'Shri Shyam Lal ji (Kayad, Ajmer) earned 3rd Prize in the Cross Breed category at Rangeelo 2026 with a solid 22.40 Kg in 24 hours.\n\n#Rangeelo2026 #MilkingCompetition #CrossBreed #ProgressiveDairying'
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
    id: 'jersey',
    name: 'Jersey',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Pawan Kumar',
        location: 'Hisar, Haryana',
        yield: '36.22 Kg',
        image: BSP_9907,
        description: 'At the Rangeelo 2026 Milking Competition, the Jersey category saw remarkable productivity. Congratulations to Shri Pawan Kumar from Hisar, Haryana for winning 1st Prize with an impressive 36.22 kg in 24 hours.\n\n#Rangeelo2026 #MilkingCompetition #JerseyBreed #DairyExcellence #ProgressiveDairying',
        quote: 'Set a high standard for productivity in Jersey category.'
      },
      {
        rank: 2,
        farmerName: 'Smt. Geeta Devi',
        location: 'Nawalgarh, Jhunjhunu',
        yield: '26.68 Kg',
        image: BSP_9891,
        description: "Representing Nawalgarh, Jhunjhunu, Smt. Geeta Devi's Jersey cow secured a prestigious second place at Rangeelo 2026, clocking an impressive 24-hour yield of 26.68 Kg.\n\nThis success is a direct result of dedication to quality feeding and daily care."
      },
      {
        rank: 3,
        farmerName: 'Shri Mangiram ji',
        location: 'Hanumangarh',
        yield: '25.02 Kg',
        image: DEEP0171,
        description: 'Securing 3rd Prize in the Jersey category, Shri Mangiram ji (Hanumangarh) recorded 25.02 kg in 24 hours.\n\nA brilliant reflection of hard work and superior genetics.'
      }
    ]
  },
  {
    id: 'murrah',
    name: 'Murrah',
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
        description: 'In the Murrah category, the buffalo of Shri Amandeep ji & Vedpal ji, Kakarod, Jind (Haryana), earned 2nd position at Rangeelo 2026 with a solid 20.76 Kg in 24 hours.\n\nBehind this performance is a story of disciplined management and top-tier husbandry.'
      },
      {
        rank: 3,
        farmerName: 'Shri Yashveer ji',
        location: 'Jind',
        yield: '20.30 Kg',
        image: DEEP0186,
        description: 'Shri Yashveer ji (Jind) earned 3rd Prize in the Murrah category with 20.30 kg in 24 hours.\n\nSolid management leads to solid results. Keep building on this success and watch your herd reach its peak in superior genetics.'
      }
    ]
  },
  {
    id: 'rathi',
    name: 'Rathi',
    winners: [
      {
        rank: 1,
        farmerName: 'Shri Dinesh Gurjar',
        location: 'Ajmer, Rajasthan',
        yield: '17.36 Kg',
        image: Rathi1st,
        description: 'At Rangeelo 2026, indigenous excellence was demonstrated in the Rathi category. Congratulations to Shri Dinesh Gurjar from Ajmer, Rajasthan for securing 1st Prize with a yield of 17.36 kg in 24 hours.\n\n#Rangeelo2026 #MilkingCompetition #Rathi #IndigenousCattle #DairyExcellence',
        quote: 'Outstanding milk yield and superior genetics in Rathi breed.'
      },
      {
        rank: 2,
        farmerName: 'Shri Ramesh ji & Ramkaran ji',
        location: 'Kayad, Ajmer',
        yield: '16.50 Kg',
        image: Rathi2nd,
        description: 'Congratulations to Shri Ramesh ji & Ramkaran ji from Kayad, Ajmer for securing 2nd place in the Rathi category with 16.50 kg in 24 hours at Rangeelo 2026.'
      },
      {
        rank: 3,
        farmerName: 'Shri Surendra Jat ji',
        location: 'Alwar',
        yield: '15.94 Kg',
        image: Rathi3rd,
        description: 'Shri Surendra Jat ji (Alwar) earned 3rd Prize in the Rathi category with a strong 15.94 kg in 24 hours.\n\nA great display of disciplined care and native breed potential.'
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
        location: 'Sikar, Rajasthan',
        yield: '12.88 Kg',
        image: Tharparkar2ndimage,
        video: Tharparkar2ndVideo,
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
  }
];

// Backwards compatibility alias
export const pashuMelaData = kashiPashuMelaData;

export const galleryImages = [
  BSP_9813, BSP_9817, BSP_9823, BSP_9833, BSP_9846, BSP_9864, BSP_9882, BSP_9891, BSP_9907,
  DEEP0164, DEEP0171, DEEP0186,
  Rathi1st, Rathi2nd, Rathi3rd,
  Sahiwal1st, Sahiwal2nd, Sahiwal3rd,
  Tharparkar3rd
];
