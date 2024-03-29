import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, useState } from "react";
import dayjs from "dayjs";

import { useMutation, useQueryClient } from "react-query";
import { createNLPQuery, createProject, createTimeblock, createVenture } from "../api/api";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function PromptDialog({ user, open, handlePromptClose }: { user: any; open: boolean; handlePromptClose: any }) {
  const [prompt, setPrompt] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [error, setError] = useState<string>("");

  const queryClient = useQueryClient();

  const { mutate, data, isLoading } = useMutation(createNLPQuery, {
    onSuccess(data, variables, context) {
      setPrompt("");
      handlePromptClose();
      console.log(data);
      setIsPreviewOpen(true);
    },
  });

  const timeblockMutation = useMutation(createTimeblock, {
    onSuccess: () => {
      queryClient.invalidateQueries("timeblocks");
    },
  });

  const ventureMutation = useMutation(createVenture, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventures");
    },
  });

  const projectMutation = useMutation(createProject, {
    onSuccess: () => {   
      queryClient.invalidateQueries("ventures");
    },
  });

  function formatDate(dayjsObj:dayjs.Dayjs) {
    return dayjsObj.format('MM:DD:YYYY HH:mm');
  }

  const handleSubmit = () => {
    function hasAtSymbolSubstring(str: string) {
      const regex = /@\w+(?:\s+\w+)*@/; // regular expression to match the pattern @example string@
      return regex.test(str); // test if the string matches the pattern
    }

    if (prompt == "") {
      setError("Text prompt cannot be empty");
      return;
    }

    if (!hasAtSymbolSubstring(prompt)) {
      setError("Please wrap the name of the input with @");
      return;
    }

    mutate({ uid: user!.uid, query: prompt });
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setError("");
    }

    setPrompt(event.target.value);
  };

  function timeStringToDate(timeString: string) {
    const [hour, minute] = timeString.split(":");
    return dayjs().set("hour", parseInt(hour)).set("minute", parseInt(minute));
  }

  const handleConfirm = () => {
    setIsPreviewOpen(false);

    if (data.type == "Task" || data.type == "Event" || data.type == "Routine") {
      timeblockMutation.mutate({
        uid: user!.uid,
        name: data.name,
        type: data.type.toLowerCase(),
        mode: "static",
        s: timeStringToDate(data.s),
        duration: data.duration,
        projectId: -1,
        reminder: null,
      });
    } else if (data.type == "Venture") {
      ventureMutation.mutate({ uid: user!.uid, name: data.name });
    } 
    else if (data.type == "Project") {

      function createDayjsObject(str:string) {
        return dayjs(str, 'MM:DD:YYYY HH:mm');
      }

      projectMutation.mutate({
        uid: user!.uid,
        name: data.name,
        status: "open",
        due:createDayjsObject(data.due),
        duration:data.duration,
        ventureId: -1,
      });
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onClose={handlePromptClose}>
        <DialogTitle>Performing your request</DialogTitle>
        <DialogContent>
          <h1>Loading...</h1>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onClose={handlePromptClose}>
        <DialogTitle>Enter the text prompt</DialogTitle>
        <DialogContent>
          <p className="text-xs text-red-500">{error ? error : ""}</p>
          <DialogContentText>Just tell Genesis what you want to do...</DialogContentText>
          <h1>{"(Please include @ symbols around the name of the resource)"}</h1>
          <TextField fullWidth value={prompt} onChange={handlePromptChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePromptClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {data && (
        <Dialog
          open={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
          }}
        >
          <DialogTitle>Completed</DialogTitle>
          <DialogContent>
            <DialogContentText>Review the following data.</DialogContentText>
            <div className="mt-2">
              <div className="w-full">
                <h1 className="text-sm text-genesis-gray-800">Name</h1>
                <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                  {data.name}
                </p>
              </div>

              <div className="grid grid-cols-2 mt-2 gap-x-4">
                <div
                  className={clsx("w-full", {
                    hidden: !(data.type == "Task" || data.type == "Event" || data.type == "Routine"),
                  })}
                >
                  <h1 className="text-sm text-genesis-gray-800">Type</h1>
                  <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                    {data.type}
                  </p>
                </div>

                <div
                  className={clsx("w-full", {
                    hidden: !(data.type == "Task" || data.type == "Event" || data.type == "Routine"),
                  })}
                >
                  <h1 className="text-sm text-genesis-gray-800">Mode</h1>
                  <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                    {"Static"}
                  </p>
                </div>

                <div
                  className={clsx("w-full mt-2", {
                    hidden: (data.type == "Task" || data.type == "Event" || data.type == "Routine", data.type == "Venture"),
                  })}
                >
                  <h1 className="text-sm text-genesis-gray-800">Due</h1>
                  <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                    {data.due}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 mt-2 gap-x-4">
                <div
                  className={clsx("w-full", {
                    hidden: !(data.type == "Task" || data.type == "Event" || data.type == "Routine"),
                  })}
                >
                  <h1 className="text-sm text-genesis-gray-800">Project</h1>
                  <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                    {"None"}
                  </p>
                </div>

                <div
                  className={clsx("w-full", {
                    hidden: !(data.type == "Task" || data.type == "Event" || data.type == "Routine"),
                  })}
                >
                  <h1 className="text-sm text-genesis-gray-800">Start Time</h1>
                  <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                    {data.s ? data.s : ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 mt-2 gap-x-4">
                <div
                  className={clsx("w-full", {
                    hidden: !(
                      data.type == "Task" ||
                      data.type == "Event" ||
                      data.type == "Routine" ||
                      data.type == "Project"
                    ),
                  })}
                >
                  <h1 className="text-sm text-genesis-gray-800">Duration</h1>
                  <div className="mt-2 flex items-center gap-x-2">
                    <span className="text-sm  text-genesis-gray-800">H</span>
                    <p className=" w-8  text-genesis-purple-300 text-center block border-black text-base px-1 py-1 rounded-lg bg-genesis-gray-200 outline-none">
                      {data.duration ? data.duration.h : ""}
                    </p>
                    <span className="">:</span>
                    <span className="text-sm  text-genesis-gray-800">M</span>
                    <p className=" w-8 text-genesis-purple-300  text-center block border-black text-base px-1 py-1 rounded-lg bg-genesis-gray-200 outline-none">
                      {data.duration ? data.duration.m : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsPreviewOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default PromptDialog;
