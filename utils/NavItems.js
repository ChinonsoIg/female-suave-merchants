import { GiUnderwear, GiAmpleDress, GiLipstick, GiRunningShoe } from "react-icons/gi";
import { DiRuby } from "react-icons/di";
import { AiFillHome } from "react-icons/ai";
import { MdPeople, MdShoppingCart, MdReviews, MdAutoGraph } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";

export const navItems = [
  {
    _id: "1",
    heading: "categories",
    items: [
      {
        id: "101",
        title: "products",
        url: "/products",
        icon: <MdShoppingCart />
      },
      {
        id: "102",
        title: "sales",
        url: "/sales",
        icon: <MdAutoGraph />
      },
      // {
      //   id: "103",
      //   title: "reviews",
      //   url: "/reviews",
      //   icon: <MdReviews />
      // },
      // {
      //   id: "104",
      //   title: "customers",
      //   url: "/customers",
      //   icon: <MdPeople />
      // },
    ]
  },
  {
    _id: "2",
    heading: "settings",
    items: [
      {
        id: "201",
        title: "profile",
        url: "/profile",
        icon: <BsFillPersonLinesFill />
      },
    ]
  },
];

