import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface SaveCancelButtonsProps {
  isSubmitting: boolean;
  editMode: boolean;
  handleEditClick: () => void;
  handleSubmitClick: () => void;
  handleCancelClick: () => void;
}

const SaveCancelButtons = ({
  isSubmitting,
  editMode,
  handleCancelClick,
  handleEditClick,
  handleSubmitClick,
}: SaveCancelButtonsProps) => {
  return (
    <div className="flex items-center gap-6">
      {isSubmitting && editMode ? (
        <CircularProgress size="1.5rem" color="inherit" />
      ) : !editMode ? (
        <button
          type="button"
          className="cursor-pointer hover:text-orange-400"
          onClick={handleEditClick}
        >
          <ModeEditIcon color="inherit" fontSize="inherit" />
        </button>
      ) : (
        <>
          <button type="submit" onClick={handleSubmitClick}>
            <CheckIcon
              color="inherit"
              fontSize="inherit"
              className="hover:text-green-500"
            />
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="hover:text-red-700"
          >
            <CloseIcon color="inherit" fontSize="inherit" />
          </button>
        </>
      )}
    </div>
  );
};

export default SaveCancelButtons;
