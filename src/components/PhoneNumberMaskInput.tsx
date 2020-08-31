import React, { useState } from "react";
import { IonInput, IonLabel, IonItem } from "@ionic/react";

interface ContainerProps {}

const PhoneNumberMaskInput: React.FC<ContainerProps> = () => {
  const [maskedInput, setMaskedInput] = useState<string>("");

  const onMaskedInputChange = (newMaskedInput: string) => {
    setMaskedInput(normalizeInput(newMaskedInput));
  };

  const normalizeInput = (value: string) => {
    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, "");

    // returns: "x", "xx", "xxx"
    if (currentValue.length < 4) return currentValue;

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (currentValue.length < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
    return (
      `(${currentValue.slice(0, 3)}) ` +
      `${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`
    );
  };

  return (
    <IonItem>
      <IonLabel position="floating">Phone Number</IonLabel>
      <IonInput
        type="tel"
        value={maskedInput}
        onIonChange={(e) => onMaskedInputChange(e.detail.value!)}
        placeholder="(___) ___-____"
        maxlength={14}
        pattern="tel"
      ></IonInput>
    </IonItem>
  );
};

export default PhoneNumberMaskInput;
