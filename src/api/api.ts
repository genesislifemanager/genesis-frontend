import axios from "axios";

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

export const getTimeBlocksByDate = async (date:Date) =>{
  try {
    const res = await api.get(`/timeblocks/date/${JSON.stringify(date)}`);
    return res.data.timeblocks;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
}

export const getTimeblockById = async (id: string | undefined) => {
  try {
    const res = await api.get(`/timeblocks/${id}`);

    return res.data.timeblock;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const createTimeblock = async (timeblock: any) => {
  console.log(timeblock);
  timeblock.duration.h = parseInt(timeblock.duration.h);
  timeblock.duration.m = parseInt(timeblock.duration.m);

  try {
    const res = await api.post("/timeblocks", timeblock);
    return res.data.newTimeblock;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const updateTimeblockById = async (timeblock: any) => {
  console.log(timeblock);

  try {
    const res = await api.put(`/timeblocks/${timeblock.id}`,timeblock);
    return res.data.updatedTimeblock;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const deleteTimeblockById = async (id:string|undefined) => {
  try {
    const res = await api.delete(`/timeblocks/${id}`);
    return res.data.deletedTimeblock;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};


