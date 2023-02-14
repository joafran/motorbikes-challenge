import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  Query,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/db";
import { ISchedule } from "../types/schedules";
import { getDocsParser } from "../utils/serialize";
import useLocalStorage from "./useStorage";

const useSchedules = () => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { storeRequest, removeRequest } = useLocalStorage();

  const getSortedSchedulesQuery = (): Query<DocumentData> =>
    query(collection(db, "schedules"), orderBy("time", "asc"));

  const getSchedules = async () => {
    setLoading(true);
    const data = await getDocs(getSortedSchedulesQuery()).then(
      getDocsParser<ISchedule[]>
    );
    setSchedules(data);
    setLoading(false);
  };

  const requestSchedule = async (id: string) => {
    const docRef = doc(db, "schedules", id);
    const schedule = (await getDoc(docRef)).data();
    if (schedule && schedule.motorbikes > 0) {
      const modifiedSchedule = {
        ...schedule,
        available: schedule.motorbikes - 1 <= 0 ? false : true,
        motorbikes: schedule.motorbikes - 1,
      };
      setDoc(docRef, modifiedSchedule);
      storeRequest(id);
    }
  };

  const undoRequest = async (id: string) => {
    const docRef = doc(db, "schedules", id);
    const schedule = (await getDoc(docRef)).data();
    if (schedule && schedule.motorbikes < 8) {
      const modifiedSchedule = {
        ...schedule,
        available: true,
        motorbikes: schedule.motorbikes + 1,
      };
      setDoc(docRef, modifiedSchedule);
      removeRequest(id);
    }
  };

  useEffect(() => {
    getSchedules();
    // onSnapshot is a Firebase listener that provides real-time document changes
    const unsubscribe = onSnapshot(
      getSortedSchedulesQuery(),
      (querySnapshot) => {
        setLoading(true);
        const newSchedules: ISchedule[] = [];
        querySnapshot.forEach((doc) => {
          newSchedules.push({ ...doc.data(), id: doc.id } as ISchedule);
        });
        setSchedules(newSchedules);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    schedules,
    loading,
    requestSchedule,
    undoRequest,
  };
};

export default useSchedules;
