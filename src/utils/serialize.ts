import { DocumentData, QuerySnapshot } from "firebase/firestore";

export const getDocsParser = <T>(res: QuerySnapshot<DocumentData>): T => {
  return res.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }) as T;
};
