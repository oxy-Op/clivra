import axios from "axios";

export default function fetchCurrentUser() {
  const query = axios.get("/api/users/me").then((res) => {
    return res.data;
  });

  return query;
}
