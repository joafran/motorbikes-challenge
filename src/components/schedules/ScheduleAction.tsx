import { Button } from "@mantine/core";
import { useState } from "react";
import useLocalStorage from "../../hooks/useStorage";
import { ISchedule, SCHEDULE_STATUS_ENUM } from "../../types/schedules";

interface ScheduleActionProps {
  schedule: ISchedule;
  requestSchedule: (id: string) => void;
  undoRequest: (id: string) => void;
}

interface ButtonProps {
  handleRequest: () => void;
  handleUndoRequest: () => void;
  available: boolean;
  loading: boolean;
}

const Buttons = {
  [SCHEDULE_STATUS_ENUM.NOT_REQUESTED]: ({
    handleRequest,
    available,
    loading,
  }: ButtonProps) => (
    <Button
      onClick={handleRequest}
      loading={loading}
      variant="subtle"
      disabled={!loading && !available}
    >
      Request motorbike
    </Button>
  ),
  [SCHEDULE_STATUS_ENUM.REQUESTED]: ({
    handleUndoRequest,
    loading,
  }: ButtonProps) => (
    <Button onClick={handleUndoRequest} loading={loading} variant="subtle">
      Undo request
    </Button>
  ),
};

const ScheduleAction: React.FC<ScheduleActionProps> = ({
  schedule,
  requestSchedule,
  undoRequest,
}) => {
  const { getRequestStatus } = useLocalStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<SCHEDULE_STATUS_ENUM>(() =>
    getRequestStatus(schedule.id)
  );

  const handleUndoRequest = () => {
    setLoading(true);
    undoRequest(schedule.id);
    setTimeout(() => {
      setStatus(SCHEDULE_STATUS_ENUM.NOT_REQUESTED);
      setLoading(false);
    }, 250);
  };

  const handleRequest = () => {
    if (status === SCHEDULE_STATUS_ENUM.NOT_REQUESTED) {
      setLoading(true);
      requestSchedule(schedule.id);
      setTimeout(() => {
        setStatus(SCHEDULE_STATUS_ENUM.REQUESTED);
        setLoading(false);
      }, 250);
    }
  };

  const ActionButton = Buttons[status];
  const actionButtonProps: ButtonProps = {
    available: schedule.available,
    handleRequest,
    handleUndoRequest,
    loading,
  };

  return <ActionButton {...actionButtonProps} />;
};

export default ScheduleAction;
