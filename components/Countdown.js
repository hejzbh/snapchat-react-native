import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Countdown = ({ expires, onComplete }) => {
  const [timeEllapsed, setTimeEllapsed] = useState(expires);

  useEffect(() => {
    let counter = expires;
    setTimeEllapsed(counter);

    const timer = () => {
      // Time expires
      if (counter === 1 || counter < 0) {
        clearInterval(timerInterval);
        onComplete();
        return;
      }

      // Decrease counter by 1
      counter--;

      setTimeEllapsed(counter);
    };

    // run this function every 1000 or 2000 seconds
    const timerInterval = setInterval(timer, 2000);
  }, [expires]);

  return (
    <View>
      <Text className="text-white">{timeEllapsed && timeEllapsed}</Text>
    </View>
  );
};

export default Countdown;
