import bcrypt from "bcryptjs";
const users = [
  {
    name: "Harry Lamb",
    email: "harry@email.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Sam Dull",
    email: "sam@email.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "John Crow",
    email: "john@email.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default users;
