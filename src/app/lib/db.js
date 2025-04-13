// const { username, password } = process.env;
const username = process.env.NEXT_PUBLIC_USERNAME
const password = process.env.NEXT_PUBLIC_PASSWORD
export const connectionStr =
  "mongodb+srv://"+username+":"+password+"@cluster0.uwtnxkd.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0";
