import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useMemo, useState } from "react";
// REDUX
import { useAuth } from "../../redux/slices/auth";
import { useFriends } from "../../redux/slices/friends";
// Firebase
import {
  collection,
  getDocs,
  query,
  where,
  start,
  startAt,
  startAfter,
  limit,
  orderBy,
} from "firebase/firestore";
import FirebasePagination from "../pagination/FirebasePagination";
import { db } from "../../firebase/config";
// Components
import User from "./User";
import Button from "../Button";
// DODATI LOKACIJU
const QuickAdd = () => {
  const { user } = useAuth();
  const { friends } = useFriends();
  const [users, setUsers] = useState([]);

  return (
    <SafeAreaView>
      <View className="py-2">
        <Text className="text-lg text-gray/20">Quick add</Text>
      </View>
      {/** LIST OF USERS */}
      <View>
        {users.length > 0 ? (
          users.map((user) => <User key={user.id} user={user} />)
        ) : (
          <Text>No users</Text>
        )}
      </View>

      {/** Firebase users collection pagination */}
      <FirebasePagination
        data={users}
        setData={setUsers}
        howMuchLoadPerPage={15}
        collectionName={"users"}
        includeWhere
        whereAttribute="id"
        whereCondition="not-in"
        whereData={[...friends, user.uid]}
      />
    </SafeAreaView>
  );
};

export default QuickAdd;
