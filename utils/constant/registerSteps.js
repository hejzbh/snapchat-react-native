export default [
  {
    key: "first_step",
    description: `What's your name?`,
    type: "input",
    inputs: [
      {
        name: "first_name",
        label: "First name",
        placeholder: "Enter your first name",
      },
      {
        name: "last_name",
        label: "Last name",
        placeholder: "Enter your last name",
      },
    ],
  },
  {
    key: "second step",
    description: `What's your email?`,
    type: "input",
    inputs: [
      {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
      },
    ],
  },
  {
    key: "third step",
    type: "input",
    description: "Your password should be at least 88 characters long.",
    inputs: [
      {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
      },
    ],
  },
  {
    key: "fouth step",
    description: `When's your birthday?`,
    type: "birthdate",
    name: "birthdate",
    inputs: [
      {
        name: "password",
        label: "fsafs",
        placeholder: "Enter your password",
      },
    ],
  },
];
