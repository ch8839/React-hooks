import React from "react";
import { templateUtil1, templateUtil2, templateUtil3 } from "../../../utils";

export const TemplateString = () => {
  const data = {
    name: "cc",
    age: 18,
  };
  const template1 = "My name is {name}, I am {age} years old.";
  const text1 = templateUtil1(template1, data);

  const template2 = "My name is ${data.name}, I am ${data.age} years old.";
  const text2 = templateUtil2(template2, data);

  const text3 = templateUtil3(template1, data);

  return (
    <div>
      <p>{text1}</p>
      <p>{text2}</p>
      <p>{text3}</p>
    </div>
  );
};
