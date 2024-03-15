import List from "@/Components/List";
import { useQuery, gql } from "@apollo/client";
import { Loading, Button } from "@web3uikit/core";
import { useEffect, useState } from "react";

const GET_USER_INFO = gql`
  {
    educationVerifieds(first: 100) {
      tokenId_
    }
  }
`;

export default function Marketplace() {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data: initialData } = useQuery(GET_USER_INFO);
  const itemsPerPage = 3;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (initialData) {
      setData(initialData.educationVerifieds);
    }
  }, [initialData]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  if (loading)
    return (
      <div
        style={{
          backgroundColor: "#0000",
          borderRadius: "8px",
          padding: "20px",
          marginLeft: 650,
        }}
      >
        <Loading
          fontSize={12}
          size={12}
          spinnerColor="#FFF"
          spinnerType="wave"
          text="Fetching list..."
        />
      </div>
    );
  if (error) return <p>Failed to fetch data. Please contract the deployer</p>;

  if (!Array.isArray(data)) return <p>Data is not an array.</p>;

  // const propData = data.educationVerifieds;
  // const pagnationData = propData.map((item) => {
  //   return item;
  // });

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);

  console.log("current items");
  console.log(currentItems);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3 style={{ margin: "20px" }}>
        List of registered talents with verified education
      </h3>
      <div className="market--place">
        {/* {propData.map((item, index) => (
          <List key={index} data={[item]} />
        ))} */}
        {currentItems.map((item, index) => (
          <List key={index} data={[item]} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "20px",
          paddingTop: "20px",
        }}
      >
        <Button
          text="Prev"
          theme="secondary"
          onClick={prevPage}
          disabled={currentPage === 1}
        />
        <Button
          text="Next"
          theme="secondary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        />
        {/* <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button> */}
      </div>
    </div>
  );
}
