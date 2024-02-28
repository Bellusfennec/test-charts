import axios from "axios";

const apiEndPoint = "https://hp-api.onrender.com/api/";
const characterEndPoint = "characters/";

export const characterService = {
  getAll: async () => {
    const { data } = await axios.get(apiEndPoint + characterEndPoint);
    return data;
  },
};
