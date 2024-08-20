import { Badge, Button, Flex, Table } from "@radix-ui/themes";
import Navbar from "../components/Navbar";

const mockData = [
  {
    category: "Death Threats",
    description: "Threatened to find and kill me",
    platform: "Twitter",
    date: new Date().toLocaleString("en-GB"),
    status: "SOLVED",
    tokensStaked: 10,
  },
  {
    category: "Death Threats",
    description: "Threatened to find and kill me",
    platform: "Twitter",
    date: new Date().toLocaleString("en-GB"),
    status: "NOT SOLVED",
    tokensStaked: 10,
  },
  {
    category: "Death Threats",
    description: "Threatened to find and kill me",
    platform: "Twitter",
    date: new Date().toLocaleString("en-GB"),
    status: "Investigation Ongoing",
    tokensStaked: 10,
  },
];

function PoliceDashboard() {
  return (
    <div className="w-screen h-screen flex-column justify-center items-center">
      <Navbar />
      <div className="w-screen flex justify-center">
        <Table.Root variant="surface" className="w-4/5 m-10">
          <Table.Header>
            <Table.Row className="uppercase text-xl font-sans text-center" align={"center"}>
              <Table.ColumnHeaderCell>Crime Category</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Platform</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date & Time</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Tokens Staked</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Chat</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="text-center text-lg">
            {mockData.map((data, index) => (
              <Table.Row align={"center"} key={index}>
                <Table.RowHeaderCell>{data.category}</Table.RowHeaderCell>
                <Table.Cell>{data.description}</Table.Cell>
                <Table.Cell>{data.platform}</Table.Cell>
                <Table.Cell>{data.date}</Table.Cell>
                <Table.Cell>{data.tokensStaked}</Table.Cell>
                <Table.Cell>
                  <Badge
                    size={"3"}
                    color={data.status === "SOLVED" ? "green" : data.status === "NOT SOLVED" ? "red" : "yellow"}
                  >
                    {data.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap={"3"} align={"center"} justify={"center"}>
                    <Button color="purple" size={"2"}>
                      CHAT
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}

export default PoliceDashboard;
