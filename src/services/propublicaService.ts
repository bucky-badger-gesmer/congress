import axios from "axios";

const BASE_URL = "https://api.propublica.org/congress/v1/117";

const getMembers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Senate/members.json`, {
      headers: {
        "X-API-Key": import.meta.env.VITE_CONGRESS_TOKEN,
      },
    });
    const senateMembers = response.data.results[0].members;
    return senateMembers;
  } catch (error) {
    // Handle error
    console.log("error", error);
  }
};

export { getMembers };
