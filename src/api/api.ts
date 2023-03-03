import axios from "axios";
import dayjs from "dayjs";

const api = axios.create({
  baseURL: "https://genesis-backend-production.up.railway.app/api",
});

export const getAllTimeblocks = async () => {
  try {
    const res = await api.get("/timeblocks");
    return res.data.timeblocks;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getTimeBlocksByDate = async (date:dayjs.Dayjs) =>{
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
  timeblock.duration.h = parseInt(timeblock.duration.h);
  timeblock.duration.m = parseInt(timeblock.duration.m);

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

export const getAllProjects = async () => {
  try {
    const res = await api.get("/projects");
    return res.data.projects;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const createProject = async (project:any) => {
  project.duration.h = parseInt(project.duration.h);
  project.duration.m = parseInt(project.duration.m);

  try {
    const res = await api.post("/projects",project);
    return res.data.newProject;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getProjectById = async (id: string | undefined) => {
  try {
    const res = await api.get(`/projects/${id}`);
    return res.data.project;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const updateProjectById = async (project: any) => {
  console.log(project);
  project.duration.h = parseInt(project.duration.h);
  project.duration.m = parseInt(project.duration.m);

  try {
    const res = await api.put(`/projects/${project.id}`, project);
    return res.data.updatedProject;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const deleteProjectById = async (id:string|undefined) => {
  try {
    const res = await api.delete(`/projects/${id}`);
    return res.data.deletedProject;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getAllVentures = async () => {
  try {
    const res = await api.get("/ventures");
    return res.data.ventures;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getVentureById = async (id: string | undefined) => {
  try {
    const res = await api.get(`/ventures/${id}`);
    return res.data.venture;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const createVenture = async (venture:any) => {

  try {
    const res = await api.post("/ventures",venture);
    return res.data.newVenture;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const updateVentureById = async (venture: any) => {
  console.log(venture);

  try {
    const res = await api.put(`/ventures/${venture.id}`, venture);
    return res.data.updatedVenture;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const deleteVentureById = async (id:string|undefined) => {
  try {
    const res = await api.delete(`/ventures/${id}`);
    return res.data.deletedVenture;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};