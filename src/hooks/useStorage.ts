import { useEffect, useState } from "react";
import { SCHEDULE_STATUS_ENUM } from "../types/schedules";

const useLocalStorage = () => {
  const [requests, setRequests] = useState<string[]>([]);

  const storeRequest = (id: string): void => {
    const newRequests = [...requests, id];
    setRequests(newRequests);
    localStorage.setItem("requestedSchedules", JSON.stringify(newRequests));
  };

  const removeRequest = (id: string): void => {
    const updatedRequests = requests.filter((req) => req !== id);
    setRequests(updatedRequests);
    localStorage.setItem("requestedSchedules", JSON.stringify(updatedRequests));
  };

  const getRequestStatus = (id: string): SCHEDULE_STATUS_ENUM => {
    const storedRequests = JSON.parse(
      localStorage.getItem("requestedSchedules") || "[]"
    ) as string[];
    const isRequested = storedRequests.find((req) => req === id);
    return isRequested
      ? SCHEDULE_STATUS_ENUM.REQUESTED
      : SCHEDULE_STATUS_ENUM.NOT_REQUESTED;
  };

  useEffect(() => {
    const storedRequests = localStorage.getItem("requestedSchedules");
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
  }, []);

  return {
    storeRequest,
    getRequestStatus,
    removeRequest,
  };
};

export default useLocalStorage;
