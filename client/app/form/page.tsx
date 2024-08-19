import { ImageIcon } from "@radix-ui/react-icons";
import { Box, Button, Checkbox, Flex, Section, Select, Text, TextField } from "@radix-ui/themes";

function CyberForm() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Box className="bg-green-1000">
        <Section className="text-center">
          <Text size={"8"}>Cyber Complaint Form</Text>
        </Section>

        <Flex direction="column" gap="4">
          <Flex direction={"column"} gap={"1"}>
            Crime Description:
            <TextField.Root size="3" placeholder="Enter Crime Description" />
          </Flex>

          <Flex direction={"column"} gap={"1"}>
            Select Category of Crime:
            <Select.Root>
              <Select.Trigger placeholder="Select an option"></Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Crime Category</Select.Label>
                  <Select.Item value="1">Day Month Year</Select.Item>
                  <Select.Item value="2">Month Day Year</Select.Item>
                  <Select.Item value="3">Year Day Month</Select.Item>
                  <Select.Item value="4">Year Month Day</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex direction={"column"} gap={"1"}>
            Platform:
            <TextField.Root placeholder="Enter platform on which this occured" />
          </Flex>

          <Flex direction={"column"} gap={"1"}>
            Enter Date:
            <TextField.Root type="datetime-local" placeholder="Enter Date" />
          </Flex>

          <Flex direction={"column"} gap={"1"}>
            Number of Tokens Staked:
            <TextField.Root type="number" placeholder="Enter number of tokens you will stake" />
          </Flex>

          <Flex direction={"column"} gap={"1"}>
            Upload Relevant Evidence:
            <Button style={{ width: "8rem" }} size={"2"}>
              <ImageIcon />
              Upload Files
            </Button>
          </Flex>

          <Flex gap="2" className="items-center">
            <Checkbox defaultChecked />I certify that the information provided is true and accurate
          </Flex>

          <Button size="3" className="w-full">
            Submit
          </Button>
        </Flex>
      </Box>
    </div>
  );
}

export default CyberForm;
