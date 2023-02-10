// import React from "react"
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import SharedLayout from "../../components/layout/SharedLayout"

// import { useFetchWithoutToken, useFetchWithToken } from "../utils/services";

// const BASE_URL = process.env.NEXT_PUBLIC_API;
// const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

// const Customers = () => {
//   const [limit, setLimit] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const router = useRouter();

//   const { data, isError, isLoading } = useFetchWithoutToken(`${BASE_URL_LOCAL}/?search=${search}&limit=${limit}&page=${currentPage}`)

//   const {
//     status,
//     data: session
//   } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/auth/signin")
//     },
//   });


//   return (
//     <SharedLayout>
//       <div>Customers</div>
//     </SharedLayout>
//   )
// }

// export default Customers