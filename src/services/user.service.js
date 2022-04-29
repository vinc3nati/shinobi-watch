import axios from "axios";
import { AUTH_API } from "../utils/constants";

export const loginUser = async ({ email, password }) =>
  await axios.post(AUTH_API.LOGIN, {
    email,
    password,
  });

export const signupUser = async ({ name, email, password }) =>
  await axios.post(AUTH_API.REGISTER, {
    email,
    password,
    name,
  });
