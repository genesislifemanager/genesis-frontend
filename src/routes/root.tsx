import { HomeIcon, Bars3Icon, Cog6ToothIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Root() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <div className="px-4 py-4 min-h-screen border relative border-black">
      <Header />
      <Outlet />
      <div className="flex justify-center rounded-lg left-4 gap-x-16 right-4 bottom-4 absolute py-2 px-4 border border-black">
        <NavLink to={"/organize/projects"}>
          <Bars3Icon width={24} height={24} />
        </NavLink>
        <NavLink to={"/home/timeblocks"}>
          <HomeIcon width={24} height={24} />
        </NavLink>
        <NavLink to={"/settings"}>
          <Cog6ToothIcon width={24} height={24} />
        </NavLink>
      </div>
      <div
        onClick={handleClickOpen}
        className="absolute w-12 h-12 border border-black cursor-pointer rounded-full bottom-20 flex items-center justify-center right-4"
      >
        <ChatBubbleOvalLeftEllipsisIcon width={24} height={24} />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter the text prompt</DialogTitle>
        <DialogContent>
          <DialogContentText>Just tell Genesis what you want to do...</DialogContentText>
          <TextField
            fullWidth          
            value={prompt}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPrompt(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Root;
