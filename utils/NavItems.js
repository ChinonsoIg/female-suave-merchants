import { GiUnderwear, GiAmpleDress, GiLipstick, GiRunningShoe } from "react-icons/gi";
import { DiRuby } from "react-icons/di";
import { AiFillHome } from "react-icons/ai";
import { MdPeople, MdOutlineLogout, MdReviews, MdAutoGraph } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";

export const navItems = [
  {
    _id: "1",
    heading: "categories",
    items: [
      {
        id: "101",
        title: "customers",
        url: "/customers",
        icon: <MdPeople />
      },
      {
        id: "102",
        title: "sales",
        url: "/sales",
        icon: <MdAutoGraph />
      },
      {
        id: "103",
        title: "reviews",
        url: "/reviews",
        icon: <MdReviews />
      },
  //     {
  //       id: "104",
  //       title: "make-ups",
  //       url: "/make-ups",
  //       icon: <GiLipstick />
  //     },
  //     {
  //       id: "105",
  //       title: "sanitaries",
  //       url: "/sanitaries",
  //       icon: <MdSanitizer />
  //     },
  //     {
  //       id: "106",
  //       title: "underwears",
  //       url: "/underwears",
  //       icon: <GiUnderwear />
  //     },
  //     {
  //       id: "107",
  //       title: "foot wears",
  //       url: "/foot-wears",
  //       icon: <GiRunningShoe />
  //     }
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
      // {
      //   id: "202",
      //   title: "logout",
      //   url: "/logout",
      //   icon: <MdOutlineLogout />
      // },
      // {
      //   id: "2.3",
      //   title: "audit logs",
      //   icon: <AuditLogs />
      // }
    ]
  },
];

