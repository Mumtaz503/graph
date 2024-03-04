import List from "./List";
import { useQuery, gql } from "@apollo/client";

const GET_USER_INFO = gql`
{
    stores(first: 5) {
      id
      name_
      _job
      experience_
    }
  }
`

export default function ListComponent() {
    const { loading, error, data } = useQuery(GET_USER_INFO);
    if (loading) return <p>Loading list please wait...</p>;
    if (error) return <p>Something went wrong</p>;
    const storesArray = data.stores;

    return <List propData={storesArray} />;
}
