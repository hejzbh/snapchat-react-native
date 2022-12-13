import { View, Text, TextInput, Image } from "react-native";
import React, { useMemo, useState } from "react";
// Register steps
import registerSteps from "../../utils/constant/registerSteps";
// Utils
import autoCorrect from "../../utils/autoCorrect";
import Button from "../Button";
import formatDate from "../../utils/formatDate";
// Libaries
import DateTimePicker from "@react-native-community/datetimepicker";
// Components
import BitmojiPicker from "../BitmojiPicker";

export const RegisterForm = ({ switchForms, onSubmit }) => {
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthdate: "",
    username: "",
    bitmoji: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const activeRegisterStep = useMemo(() => {
    return registerSteps[activeStep];
  }, [activeStep]);
  const lastRegisterStep = useMemo(
    () => registerSteps[registerSteps.length - 1],
    []
  );

  const handleInputChange = (name, value) => {
    setRegisterData((registerData) => ({
      ...registerData,
      [name]: autoCorrect(name, value),
    }));
  };

  const areActiveStepInputsEmpty = (acitveStepInputs) => {
    return acitveStepInputs
      .map((input) => input.name)
      .some((name) => registerData[name] === "");
  };

  const nextStep = () => setActiveStep((step) => step + 1);
  console.log(registerData);
  return (
    <View className="min-w-[60%]">
      {/** Current active step needed inputs */}
      {activeRegisterStep?.type === "input" ? (
        <>
          {activeRegisterStep.inputs.map((input) => (
            <View key={input.key} className="mb-5">
              {/** Label */}
              <Text className="mb-1 text-blue-500 uppercase">
                {input.label}
              </Text>
              {/** Input */}
              <TextInput
                className="w-full p-2"
                value={registerData[input.name]}
                onChangeText={(value) => handleInputChange(input.name, value)}
              />
              {/** Border */}
              <View className="w-full bg-blue-300 h-[2px]"></View>
            </View>
          ))}
        </>
      ) : activeRegisterStep.type === "birthdate" ? (
        /** Current input step needs birthdate libary */
        <>
          {registerData.birthdate ? (
            <>
              <Text>Birthdate</Text>
              <Text
                onPress={() =>
                  setRegisterData((data) => ({
                    ...registerData,
                    birthdate: "",
                  }))
                }
              >
                {formatDate(new Date(registerData.birthdate))}
              </Text>
            </>
          ) : (
            <DateTimePicker
              value={registerData.birthdate || new Date()}
              onChange={(e, value) =>
                handleInputChange(activeRegisterStep.name, value.toISOString())
              }
            />
          )}
        </>
      ) : (
        <View className="flex justify-center items-center">
          {registerData.bitmoji ? (
            <Image
              source={{ uri: registerData.bitmoji.url }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <>
              <Text>Select your bitmoji</Text>
              <BitmojiPicker
                onBitmojiSelected={(bitmoji) =>
                  handleInputChange("bitmoji", bitmoji)
                }
              />
            </>
          )}
        </View>
      )}

      {/** Buttons */}
      {activeRegisterStep.key === lastRegisterStep.key ? (
        <Button
          onPress={() => onSubmit(registerData)}
          title="Register"
          disabled={!registerData[lastRegisterStep.name]}
        />
      ) : (
        <Button
          onPress={nextStep}
          title="Continue"
          disabled={areActiveStepInputsEmpty(activeRegisterStep.inputs)}
        />
      )}
    </View>
  );
};

export default RegisterForm;
