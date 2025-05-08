import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DescriptionDialogprops {
  description: string;
  openDescriptionDialog: boolean;
  setOpenDescriptionDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DescriptionDialog = ({
  description,
  openDescriptionDialog,
  setOpenDescriptionDialog,
}: DescriptionDialogprops) => {
  return (
    <Dialog
      open={openDescriptionDialog}
      onOpenChange={(val) => setOpenDescriptionDialog(val)}
    >
      <DialogContent className="max-h-[70vh] max-w-3xl overflow-auto scrollbar-none">
        <DialogHeader>
          <DialogTitle className="text-3xl">About this space</DialogTitle>
          <DialogDescription className="text-base text-black">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionDialog;
