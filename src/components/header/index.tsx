import { Title, Header as MantineHeader } from "@mantine/core";

const Header = () => {
  return (
    <MantineHeader px={14} py={5} height={50} style={{ background: "#228be6" }}>
      <Title style={{ color: "white" }} order={2}>
        Motorbikes Challenge
      </Title>
    </MantineHeader>
  );
};

export default Header;
