import axios from "axios";

// starts at 80, all the way to 117
const BASE_URL = "https://api.propublica.org/congress/v1/118";

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

const getMember = async (memberId: string) => {
  try {
    const response = await axios.get(
      `https://api.propublica.org/congress/v1/members/${memberId}.json`,
      {
        headers: {
          "X-API-Key": import.meta.env.VITE_CONGRESS_TOKEN,
        },
      }
    );
    const member = response.data.results[0];
    return member;
  } catch (error) {
    // Handle error
    console.log("error", error);
  }
};

export { getMembers, getMember };
