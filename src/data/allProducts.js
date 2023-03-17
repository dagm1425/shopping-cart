import c9ActiveTee from "./images/c9_active_tee.jpg";
import c9ActiveTee1 from "./images/c9_active_tee_1.jpg";
import c9Hoodie from "./images/c9_hoodie.jpg";
import c9Hoodie1 from "./images/c9_hoodie_1.jpg";
import hanesHoodie from "./images/hanes_hoodie.jpg";
import hanesHoodie1 from "./images/hanes_hoodie_1.jpg";
import uaActiveTee from "./images/ua_active_tee.jpg";
import uaActiveTee1 from "./images/ua_active_tee_1.jpg";
import hanesActiveShirtM from "./images/hanes_active_shirt_m.jpg";
import hanesActiveShirtM1 from "./images/hanes_active_shirt_m_1.jpg";
import uaActiveHoodieM from "./images/ua_active_hoodie_m.jpg";
import uaActiveHoodieM1 from "./images/ua_active_hoodie_m_1.jpg";
import uaActiveShirtM from "./images/ua_active_shirt_m.jpg";
import uaActiveShirtM1 from "./images/ua_active_shirt_m_1.jpg";
import uaGymshortsM from "./images/ua_gym_shorts_m.jpg";
import uaGymshortsM1 from "./images/ua_gym_shorts_m_1.jpg";
import uaTechTeeM1 from "./images/ua_tech_tee_m_1.jpg";
import uaTechTeeM from "./images/ua_tech_tee_m.jpg";
import uniqid from "uniqid";

const products = [
  {
    id: uniqid(),
    title: "Hanes Sport Women's Performance Fleece Full Zip Hoodie",
    brand: "Hanes",
    img: hanesHoodie,
    gallery: [hanesHoodie, hanesHoodie1],
    price: 25,
    quantity: 1,
    gender: "woman",
    rating: 4.5,
  },
  {
    id: uniqid(),
    title: "C9 Champion Women's Active Tee",
    brand: "Champion",
    img: c9ActiveTee,
    gallery: [c9ActiveTee, c9ActiveTee1],
    price: 12,
    quantity: 1,
    gender: "woman",
    rating: 4.4,
  },
  {
    id: uniqid(),
    title: "C9 Champion Women's Full Zip Cardio Jacket",
    brand: "Champion",
    img: c9Hoodie,
    gallery: [c9Hoodie, c9Hoodie1],
    price: 27,
    quantity: 1,
    gender: "woman",
    rating: 4.8,
  },
  {
    id: uniqid(),
    title: "Under Armour Women's Tech V-Neck Short-Sleeve T-Shirt",
    brand: "Under Armour",
    img: uaActiveTee,
    gallery: [uaActiveTee, uaActiveTee1],
    price: 11,
    quantity: 1,
    gender: "woman",
    rating: 4.2,
  },
  {
    id: uniqid(),
    title: "Under Armour Men's Raid 2.0 Workout Gym Shorts",
    brand: "Under Armour",
    img: uaGymshortsM,
    gallery: [uaGymshortsM, uaGymshortsM1],
    price: 17.5,
    quantity: 1,
    gender: "man",
    rating: 4.1,
  },
  {
    id: uniqid(),
    title:
      "Hanes Sport Men's Long-Sleeve T-Shirt Pack, Cool DRI Moisture-Wicking Performance T-Shirts, Performance Tee",
    brand: "Hanes",
    img: hanesActiveShirtM,
    gallery: [hanesActiveShirtM, hanesActiveShirtM1],
    price: 18.24,
    quantity: 1,
    gender: "man",
    rating: 4.5,
  },
  {
    id: uniqid(),
    title: "Under Armour Men's HeatGear Compression Long-Sleeve T-Shirt",
    brand: "Under Armour",
    img: uaActiveShirtM,
    gallery: [uaActiveShirtM, uaActiveShirtM1],
    price: 28.9,
    quantity: 1,
    gender: "man",
    rating: 3.2,
  },
  {
    id: uniqid(),
    title: "Under Armour Men's Tech 2.0 Hoodie",
    brand: "Under Armour",
    img: uaActiveHoodieM,
    gallery: [uaActiveHoodieM, uaActiveHoodieM1],
    price: 25.21,
    quantity: 1,
    gender: "man",
    rating: 4.6,
  },
  {
    id: uniqid(),
    title: "Under Armour Men's Tech 2.0 Short-Sleeve T-Shirt",
    brand: "Under Armour",
    img: uaTechTeeM,
    gallery: [uaTechTeeM, uaTechTeeM1],
    price: 18.75,
    quantity: 1,
    gender: "man",
    rating: 4.3,
  },
];

export default products;
