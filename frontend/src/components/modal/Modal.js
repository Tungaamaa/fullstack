import React from "react";
import { Box, Modal as MuiModal } from "@mui/material";
import "./Modal.css";



export const Modal = (props) => {
  const { open, handleClose, children } = props;

  return (
    <div>
      <MuiModal open={open} onClose={handleClose}>
        <Box  className="modal">{children}</Box>
      </MuiModal>
    </div>
  );
};
