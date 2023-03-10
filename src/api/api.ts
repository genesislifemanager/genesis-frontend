import axios from "axios";
import dayjs from "dayjs";

const api = axios.create({
  baseURL: "http://localhost:5174/api",
});

export const createUser = async (user:{uid:string}) =>{
  try {
    const createdUser = await api.post("/users",user);
  } catch (error) {
    console.log(error);
  }
}

export const getAllTimeblocks = async (uid:string) => {
  try {
    const res = await api.get(`/timeblocks/${uid}`);
    return res.data.timeblocks;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getOpenTimeBlocksByDate = async (uid:string, date:dayjs.Dayjs) =>{
  try {
    const res = await api.get(`/timeblocks/${uid}/date/${JSON.stringify(date)}?status=open`);
    return res.data.timeblocks;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
}

export const getClosedTimeBlocksByDate = async (uid:string,date:dayjs.Dayjs) =>{
  try {
    const res = await api.get(`/timeblocks/${uid}/date/${JSON.stringify(date)}?status=closed`);
    return res.data.timeblocks;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
}

export const getTimeblockById = async (uid:string, id: string | undefined) => {
  try {
    const res = await api.get(`/timeblocks/${uid}/${id}`);

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
    const res = await api.post(`/timeblocks/${timeblock.uid}`, timeblock);
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
    const res = await api.put(`/timeblocks/${timeblock.uid}/${timeblock.id}`,timeblock);
    return res.data.updatedTimeblock;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const deleteTimeblockById = async ({uid,id}:{uid:string, id:string|undefined}) => {
  try {
    const res = await api.delete(`/timeblocks/${uid}/${id}`);
    return res.data.deletedTimeblock;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getAllProjects = async (uid:string) => {
  try {
    const res = await api.get(`/projects/${uid}`);
    return res.data.projects;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const createProject = async (project:any) => {
  project.duration.h = parseInt(project.duration.h);
  project.duration.m = parseInt(project.duration.m);

  try {
    const res = await api.post(`/projects/${project.uid}`,project);
    return res.data.newProject;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getProjectById = async (uid:string, id: string | undefined) => {
  try {
    const res = await api.get(`/projects/${uid}/${id}`);
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
    const res = await api.put(`/projects/${project.uid}/${project.id}`, project);
    return res.data.updatedProject;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const deleteProjectById = async ({uid,id}:{uid:string, id:string|undefined}) => {
  try {
    const res = await api.delete(`/projects/${uid}/${id}`);
    return res.data.deletedProject;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getAllVentures = async (uid:string) => {
  try {
    const res = await api.get(`/ventures/${uid}`);
    return res.data.ventures;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const getVentureById = async (uid:string, id: string | undefined) => {
  try {    
    
    const res = await api.get(`/ventures/${uid}/${id}`);
    return res.data.venture;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const createVenture = async (venture:any) => {

  try {
    const res = await api.post(`/ventures/${venture.uid}`,venture);
    return res.data.newVenture;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const updateVentureById = async (venture: any) => {
  console.log(venture);

  try {
    const res = await api.put(`/ventures/${venture.uid}/${venture.id}`, venture);
    return res.data.updatedVenture;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};

export const deleteVentureById = async ({uid,id}:{uid:string, id:string|undefined}) => {
  try {
    const res = await api.delete(`/ventures/${uid}/${id}`);
    return res.data.deletedVenture;
  } catch (error) {
    throw new Error("Unable to connect to the server");
  }
};