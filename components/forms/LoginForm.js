import { View, TextInput, Text } from "react-native";
import React, { useState } from "react";
// Utils
import autoCorrect from "../../utils/autoCorrect";
// COmponents
import Button from "../Button";

export const LoginForm = ({ switchForms, onSubmit }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (value, name) => {
    setLoginData((loginData) => ({
      ...loginData,
      [name]: autoCorrect(name, value),
    }));
  };

  return (
    <View className="min-w-[60%]">
      {/** Email */}
      <View className="mb-5">
        {/** Label */}
        <Text className="mb-1 text-blue-500 uppercase">Email</Text>
        {/** Input */}
        <TextInput
          className="w-full p-2"
          value={loginData.email}
          onChangeText={(value) => handleInputChange(value, "email")}
        />
        {/** Border */}
        <View className="w-full bg-blue-300 h-[2px]"></View>
      </View>

      {/** Password */}
      <View>
        {/** -I- */}
        <Text className="mb-1 text-blue-500 uppercase">Password</Text>
        {/** -I- */}
        <TextInput
          className=" w-full p-2"
          value={loginData.password}
          onChangeText={(value) => handleInputChange(value, "password")}
        />
        {/** -I- */}
        <View className="w-full bg-blue-300 h-[2px]"></View>
      </View>

      {/** Change to register form */}
      <Button
        title="You dont have an account?"
        extraClass="p-0 bg-transparent"
        onPress={switchForms}
      />

      {/** Subimt button */}
      <Button
        title="Sign in"
        textColor="blue-400"
        disabled={!loginData.email || !loginData.password}
        onPress={() => onSubmit(loginData)}
      />
    </View>
  );
};

export default LoginForm;
