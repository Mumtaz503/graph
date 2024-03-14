import CardBox from "./CardBox";

export default function List(props) {
  const dataArray = props.data.map((dataItem) => dataItem.tokenId_);

  console.log("Data Array is");
  console.log(dataArray);
  return (
    <div>
      <CardBox tokenId={dataArray} isInMarketplace={true} />
    </div>
  );
}
