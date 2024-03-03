import { Table } from "@web3uikit/core";

export default function List() {
    return (
        <div className="user--list">
            <h3>People who have entered their info</h3>
            <Table
                columnsConfig="80px 3fr 2fr 2fr 80px"
                data={[
                    [
                        "", 
                        "my", 
                        "friend", 
                        "how u doin?"
                    ]
                ]}
                header={[
                    '',
                    <span>Name</span>,
                    <span>Job</span>,
                    <span>Experience</span>,
                    ''
                ]}
                isColumnSortable={[
                    false,
                    false,
                    false,
                    false
                ]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() { }}
                onRowClick={function noRefCheck() { }}
                pageSize={5}
            />
        </div>
    );
}