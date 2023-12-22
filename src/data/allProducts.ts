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
import championJoggerM from "./images/champion_jogger_m.jpg";
import championJoggerM1 from "./images/champion_jogger_m_1.jpg";
import uaGymshortsM from "./images/ua_gym_shorts_m.jpg";
import uaGymshortsM1 from "./images/ua_gym_shorts_m_1.jpg";
import uaTechTeeM1 from "./images/ua_tech_tee_m_1.jpg";
import uaTechTeeM from "./images/ua_tech_tee_m.jpg";
import uniqid from "uniqid";

const products = [
  {
    id: uniqid(),
    title: "Hanes Sport Women's Performance Hoodie",
    brand: "Hanes",
    img: hanesHoodie,
    gallery: [hanesHoodie, hanesHoodie1],
    price: 25,
    priceId: "price_1OPiHhKFC2d2TlDtIIhOWbeS",
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
    priceId: "price_1OPmGYKFC2d2TlDtkooGVLah",
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
    priceId: "price_1OPmKNKFC2d2TlDtCx8EtiBg",
    quantity: 1,
    gender: "woman",
    rating: 4.8,
  },
  {
    id: uniqid(),
    title: "Under Armour Women's Tech V-Neck Short-Sleeve T-Shirt",
    brand: "Under_Armour",
    img: uaActiveTee,
    gallery: [uaActiveTee, uaActiveTee1],
    price: 11,
    priceId: "price_1OPmRXKFC2d2TlDt7vXHttvI",
    quantity: 1,
    gender: "woman",
    rating: 4.2,
  },
  {
    id: uniqid(),
    title: "Under Armour Men's Raid 2.0 Workout Gym Shorts",
    brand: "Under_Armour",
    img: uaGymshortsM,
    gallery: [uaGymshortsM, uaGymshortsM1],
    price: 17.5,
    priceId: "price_1OPmTzKFC2d2TlDtkYVQcTNh",
    quantity: 1,
    gender: "man",
    rating: 4.1,
  },
  {
    id: uniqid(),
    title: "Hanes Sport Men's Long-Sleeve T-Shirt Pack, Performance Tee",
    brand: "Hanes",
    img: hanesActiveShirtM,
    gallery: [hanesActiveShirtM, hanesActiveShirtM1],
    price: 18.24,
    priceId: "price_1OPmVWKFC2d2TlDtU9bgnQyB",
    quantity: 1,
    gender: "man",
    rating: 4.5,
  },
  {
    id: uniqid(),
    title: "Champion174 Mens Powerblend Graphic Jogger",
    brand: "Champion",
    img: championJoggerM,
    gallery: [championJoggerM, championJoggerM1],
    price: 24.9,
    priceId: "price_1OPmYOKFC2d2TlDtaqoxB5Gr",
    quantity: 1,
    gender: "man",
    rating: 3.6,
  },
  {
    id: uniqid(),
    title: "Under Armour Men's Tech 2.0 Hoodie",
    brand: "Under_Armour",
    img: uaActiveHoodieM,
    gallery: [uaActiveHoodieM, uaActiveHoodieM1],
    price: 25.21,
    priceId: "price_1OPmZPKFC2d2TlDte0EZLid5",
    quantity: 1,
    gender: "man",
    rating: 4.6,
  },
  {
    id: uniqid(),
    title: "Under Armour Men's Tech 2.0 Short-Sleeve T-Shirt",
    brand: "Under_Armour",
    img: uaTechTeeM,
    gallery: [uaTechTeeM, uaTechTeeM1],
    price: 18.75,
    priceId: "price_1OPmaOKFC2d2TlDtK576zBlC",
    quantity: 1,
    gender: "man",
    rating: 4.3,
  },
];

export default products;
