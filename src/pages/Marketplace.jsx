import List from "@/Components/List";
import { useQuery, gql } from "@apollo/client";
import { Pagination, Loading } from "@web3uikit/core";

const GET_USER_INFO = gql`
  {
    educationVerifieds(first: 100) {
      tokenId_
    }
  }
`;

export default function Marketplace() {
  const { loading, error, data } = useQuery(GET_USER_INFO);
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

  const propData = data.educationVerifieds;
  // console.log(propData);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3 style={{ margin: "20px" }}>
        List of registered talents with verified education
      </h3>
      <div className="market--place">
        {propData.map((item, index) => (
          <List key={index} data={[item]} />
        ))}
      </div>
      <div
        style={{
          overflowX: "auto",
          marginTop: "70px",
          paddingRight: "50px",
        }}
      >
        <Pagination
          currentPage={1}
          onPageChange={function noRefCheck() {}}
          pageSize={2}
          siblingCount={2}
          totalCount={5}
        />
      </div>
    </div>
  );
}
