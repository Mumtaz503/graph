// // import { useMoralis } from "react-moralis";
// import { useState, useEffect } from "react";
// import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
// import Moralis from "moralis-v1";

// const GET_USER_INFO = gql`
// {
//   idTokenMinteds(first: 100) {
//     professional_
//   }
// }
// `;

// export async function getServerSideProps(context) {

//   await Moralis.enableWeb3();

//   const client = new ApolloClient({
//     uri: 'https://api.studio.thegraph.com/query/65711/pro-ind/v0.0.2',
//     cache: new InMemoryCache(),
//   });

//   try {
//     const { data } = await client.query({
//       query: GET_USER_INFO,
//     });



//     const {isWeb3Enabled, account, Moralis } = useMoralis();
//     const [isProfessionalPresent, setIsProfessionalPresent] = useState(false);
//     const { loading, error, data } = useQuery(GET_USER_INFO);
  
//     function checkProfessional(addr, loading, error, data, setIsProfessionalPresent) {
//       if (loading) {
//         console.log("Loading data...");
//         return;
//       }
//       if (error) {
//         console.error("Error fetching data:", error);
//         return;
//       }
//       if (!data || !data.idTokenMinteds) {
//         console.log("No data available");
//         return;
//       }
  
//       const { idTokenMinteds } = data;
//       const isProfessionalPresent = idTokenMinteds.some(item => item.professional_ === addr);
  
//       if (isProfessionalPresent) {
//         console.log("User present");
//         setIsProfessionalPresent(true);
//       } else {
//         console.log("User not present");
//         setIsProfessionalPresent(false);
//       }
//     }
  
//     useEffect(() => {
//       const checkProfessionalOnMount = async () => {
//         checkProfessional(account, loading, error, data, setIsProfessionalPresent);
//       };
  
//       checkProfessionalOnMount();
  
//       const accountChangedListener = Moralis.onAccountChanged(async (address) => {
//         checkProfessional(address, loading, error, data, setIsProfessionalPresent);
//       });
  
//       return () => {
//         accountChangedListener();
//       };
//     }, [account, loading, error, data, setIsProfessionalPresent]);
  
//     if (isWeb3Enabled && isProfessionalPresent) {
//       return {
//         redirect: {
//           destination: '/Dashboard',
//           permanent: false,
//         },
//       };
//     }
//     return {
//       props: {},
//     };
//   }