import { View, Text, TextInput } from "react-native";
import React, { useMemo, useState } from "react";
// Register steps
import registerSteps from "../../utils/constant/registerSteps";
// Utils
import autoCorrect from "../../utils/autoCorrect";
import Button from "../Button";
import formatDate from "../../utils/formatDate";
// Libaries
import DateTimePicker from "@react-native-community/datetimepicker";

export const RegisterForm = ({ switchForms, onSubmit }) => {
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthdate: "",
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

  return (
    <View className="min-w-[60%]">
      {/** Current active step needed inputs */}
      {activeRegisterStep?.type === "input" ? (
        <>
          {activeRegisterStep.inputs.map((input) => (
            <View className="mb-5">
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
      ) : (
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
                {formatDate(registerData.birthdate)}
              </Text>
            </>
          ) : (
            <DateTimePicker
              value={new Date()}
              onChange={(e, value) =>
                handleInputChange(activeRegisterStep.name, value)
              }
            />
          )}
        </>
      )}
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
