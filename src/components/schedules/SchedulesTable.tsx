import { Title, Container, LoadingOverlay } from "@mantine/core";
import { useState } from "react";
import Table from "../ui/Table";

const Schedules = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [schedules, setSchedules] = useState([]);

  if (loading) {
    return <LoadingOverlay visible />;
  }

  if (!schedules.length) {
    return <Title>There was an error...</Title>;
  }

  return (
    <Container>
      <Table
        mantineTableProps={{
          style: { margin: "0 auto" },
          fontSize: "lg",
          verticalSpacing: 10,
          w: "70%",
        }}
        data={schedules}
        columns={[]}
      />
    </Container>
  );
};

export default Schedules;
