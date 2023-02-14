import { Container, LoadingOverlay, Badge } from "@mantine/core";
import useSchedules from "../../hooks/useSchedules";
import Table from "../ui/Table";
import ScheduleAction from "./ScheduleAction";

const Schedules = () => {
  const { schedules, loading, requestSchedule, undoRequest } = useSchedules();

  if (loading) {
    return <LoadingOverlay visible />;
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
        columns={[
          {
            label: "Motorbikes",
            key: "motorbikes",
            render: (value, record) => <Badge size="lg">{value}</Badge>,
          },
          {
            label: "Time",
            key: "time",
            render: (value, record) => (
              <Badge color="cyan" size="lg">
                {value}
              </Badge>
            ),
          },
          {
            label: "Available",
            key: "available",
            render: (available, record) => (
              <Badge w="100%" color={available ? "green" : "red"}>
                {available ? "Yes" : "No"}
              </Badge>
            ),
          },
          {
            label: "Actions",
            key: "actions",
            render: (_, record) => (
              <ScheduleAction
                schedule={record}
                requestSchedule={requestSchedule}
                undoRequest={undoRequest}
              />
            ),
          },
        ]}
      />
    </Container>
  );
};

export default Schedules;
