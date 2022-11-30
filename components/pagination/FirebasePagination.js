import { View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, limit, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Button from "../Button";

const Pagination = ({
  data, // data we fetched
  setData, // when we fetch data from firestore, store it into this state, for example this coulde be setUsers, setMessages
  howMuchLoadPerPage,
  loading,
  setLoading,
  collectionName,
  includeWhere = false,
  whereCondition, // !=, not-in, contains-any, in and more...
  whereAttribute, // id, first_name, email and more...
  whereData, // data we using for condition
}) => {
  const [perPage, setPerPage] = useState(howMuchLoadPerPage);
  const [noMore, setNoMore] = useState(false);
  const [whereConditionData, setWhereConditionData] = useState(whereData);

  useEffect(() => {
    const getDataFromFirestore = async () => {
      // If we needs where() in query
      if (includeWhere) {
        await getDocs(
          query(
            collection(db, collectionName),
            where(whereAttribute, whereCondition, whereConditionData),
            limit(perPage)
          )
        ).then(({ docs }) => {
          // If all data is fetched set noMore as true
          docs.length === data.length ? setNoMore(true) : setNoMore(false);
          // Get all fetched data
          const updatedData = docs.map((doc) => doc.data());
          // Update data state
          setData(updatedData);
        });
      }
      // If we dont needs where() in query
      else {
        await getDocs(
          query(collection(db, collectionName), limit(perPage))
        ).then(({ docs }) => {
          // If all data is fetched set noMore as true
          docs.length === data.length ? setNoMore(true) : setNoMore(false);
          // Get all fetched data
          const updatedData = docs.map((doc) => doc.data());
          // Update data state
          setData(updatedData);
        });
      }
    };
    getDataFromFirestore();
  }, [collectionName, perPage, whereConditionData]);

  return (
    <View>
      <Button
        extraClass="py-2 px-0 bg-transparent mt-0"
        textColor="text-[#000]"
        disabled={noMore}
        onPress={() => setPerPage((perPage) => perPage + howMuchLoadPerPage)}
        title={
          noMore
            ? `There are all ${collectionName}`
            : `Load more ${collectionName}`
        }
      />
    </View>
  );
};

export default Pagination;
