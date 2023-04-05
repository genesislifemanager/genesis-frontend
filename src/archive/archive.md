```jsx
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, useState } from "react";

import { useMutation } from "react-query";
import { createNLPQuery } from "../api/api";
import { useNavigate } from "react-router-dom";

function PromptDialog({ user, open, handleClose }: { user: any; open: boolean; handleClose: any }) {
  const [prompt, setPrompt] = useState("");
  const [promptData,setPromptData] = useState({name:"",type: "",s:"",duration:{h:"0",m:"0"}})


  const nlpMutation = useMutation(createNLPQuery, {
    onSuccess(data, variables, context) {
      
      console.log(data);   
      setPromptData({name:data.name,type:data.type, s:data.s,duration:data.duration})   
    },
  });

  const handleSubmit = () => {

    nlpMutation.mutate({ uid: user!.uid, query: prompt });
    
  };


const handleConfirm = () => {
    handleClose();    
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogCustomContent
        prompt={prompt}
        isLoading={nlpMutation.isLoading}
        isSuccess={nlpMutation.isSuccess}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleSubmit={handleSubmit}
        handlePromptChange={handlePromptChange}
      />
    </Dialog>
  );
}

export default PromptDialog;

function DialogCustomContent({
  prompt,
 
  isLoading,
  isSuccess,
  handleClose,
  handleConfirm,
  handleSubmit,
  handlePromptChange,
}: {
  prompt: string;
  
  isLoading: boolean;
  isSuccess: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  handleSubmit: () => void;
  handlePromptChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  if (isLoading) {
    return (
      <>
        <DialogTitle>Please wait</DialogTitle>
        <DialogContent>
          <DialogContentText>Loading...</DialogContentText>
        </DialogContent>
      </>
    );
  }

  if (isSuccess) {

    
    return (
      <>
        <DialogTitle>Completed</DialogTitle>
        <DialogContent>
          <DialogContentText>Review the following data.</DialogContentText>
          <div className="mt-2">
            <div className="w-full">
              <h1 className="text-sm text-genesis-gray-800">Timeblock Name</h1>
              <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                {"SDGP Implementation"}
              </p>
            </div>

            <div className="grid grid-cols-2 mt-2 gap-x-4">
              <div className="w-full">
                <h1 className="text-sm text-genesis-gray-800">Type</h1>
                <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                  {"Task"}
                </p>
              </div>

              <div className="w-full">
                <h1 className="text-sm text-genesis-gray-800">Mode</h1>
                <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                  {"Static"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-2 gap-x-4">
              <div className="w-full">
                <h1 className="text-sm text-genesis-gray-800">Project</h1>
                <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                  {"None"}
                </p>
              </div>

              <div className="w-full">
                <h1 className="text-sm text-genesis-gray-800">Start Time</h1>
                <p className="bg-genesis-gray-200 mt-2 outline-none  text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1 ">
                  {"08:30"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-2 gap-x-4">
              <div className="w-full">
                <h1 className="text-sm text-genesis-gray-800">Duration</h1>
                <div className="mt-2 flex items-center gap-x-2">
                  <span className="text-sm  text-genesis-gray-800">H</span>
                  <p className=" w-8  text-genesis-purple-300 text-center block border-black text-base px-1 py-1 rounded-lg bg-genesis-gray-200 outline-none">
                    {0}
                  </p>
                  <span className="">:</span>
                  <span className="text-sm  text-genesis-gray-800">M</span>
                  <p className=" w-8 text-genesis-purple-300  text-center block border-black text-base px-1 py-1 rounded-lg bg-genesis-gray-200 outline-none">
                    {0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </>
    );
  }

  return (
    <>
      <DialogTitle>Enter the text prompt</DialogTitle>
      <DialogContent>
        <DialogContentText>Just tell Genesis what you want to do...</DialogContentText>
        <TextField fullWidth value={prompt} onChange={handlePromptChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </>
  );
}

```