import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PlaceOffersDialogProps {
  openPlaceOffersDialog: boolean;
  setOpenPlaceOffersDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaceOffersDialog = ({
  openPlaceOffersDialog,
  setOpenPlaceOffersDialog,
}: PlaceOffersDialogProps) => {
  return (
    <Dialog
      open={openPlaceOffersDialog}
      onOpenChange={(val) => setOpenPlaceOffersDialog(val)}
    >
      <DialogContent className="max-h-[70vh] max-w-xl overflow-auto scrollbar-none">
        <DialogHeader>
          <DialogTitle className="text-3xl">What this place offers</DialogTitle>
          <DialogDescription className="text-base text-black">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceOffersDialog;
