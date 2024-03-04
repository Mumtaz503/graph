import { Table } from "@web3uikit/core";

export default function List(props) {

    const dataArray = Object.values(props.propData).map(dataItem => ([
        "", // Placeholder for avatar or any other content
        dataItem.name_,
        dataItem._job,
        dataItem.experience_,
    ]));

    return (
        <div className="user--list">
            <h3>People who have entered their info</h3>
            <Table
                columnsConfig="80px 3fr 2fr 2fr 80px"
                data={
                    dataArray
                }
                header={[
                    '',
                    <span>Name</span>,
                    <span>Job</span>,
                    <span>Experience</span>,
                    ''
                ]}
                isColumnSortable={[
                    false,
                    true,
                    false,
                    false
                ]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() { }}
                onRowClick={function noRefCheck() { }}
                pageSize={10}
            />
        </div>
    );
}