import axios from "axios";

type timeblock = {};

const api = axios.create({
  baseURL: "http://localhost:5174/api",
});

export const getAllTimeblocks = async () => {
  try {
    const res = await api.get("/timeblocks");
    return res.data.timeblocks;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const createTimeblock = async (
  timeblockName: string,
  type: string,
  mode: string,
  s: Date | null,
  duration: { h: string; m: string },
  project: string | null,
  reminder: Date | null
) => {
  
  const blockDuration = { h: parseInt(duration.h), m: parseInt(duration.m) };
  console.log({ timeblockName, type, mode, s, blockDuration, project, reminder });

  try {
      const res = await api.post("/timeblocks", {name:timeblockName,type,mode,s,duration:blockDuration,project,reminder});
      return res.data.newTimeblock;
  } catch (error) {
      throw new Error("Unable to connect to the server");
  }
};
