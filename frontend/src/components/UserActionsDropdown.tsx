import MoreVert from "@mui/icons-material/MoreVert";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import { ProjectedUser } from "@/types/User";
import { useNavigate } from "react-router-dom";
import { UsersService } from "@/api/users";

interface UserActionsDropdownProps {
  user: ProjectedUser;
}

const UserActionsDropdown = ({ user }: UserActionsDropdownProps) => {
  const navigate = useNavigate();
  const { mutate: blockUser } = UsersService.useBlockUser();
  const [open, setOpen] = useState(false);

  const blockUserAction = () => {
    blockUser(user.id);
    setOpen(false);
    navigate("..");
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <MoreVert color="inherit" fontSize="medium" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          className="flex justify-center items-center group static outline-none bg-gray-100  dark:bg-[#585252] rounded-md min-w-16 max-w-[7rem] border border-gray-300 dark:border-[#343030] text-lg"
        >
          <DialogItem
            action={blockUserAction}
            dropdownSetOpen={setOpen}
            triggerChildren={
              <button
                type="button"
                className="flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600  focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-40 rounded-md px-3 py-1"
              >
                <DoNotDisturbIcon fontSize="inherit" />
                <span>Block</span>
              </button>
            }
          >
            <AlertDialog.Title className="text-lg font-semibold">
              Block User
            </AlertDialog.Title>
            <AlertDialog.Description className="text-base font-light">
              This action cannot be undone. Are you sure you want to block{" "}
              {user.firstName}?
            </AlertDialog.Description>
          </DialogItem>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface DialogItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Item> {
  dropdownSetOpen: (open: boolean) => void;
  triggerChildren: React.ReactNode;
  action: () => void;
}

const DialogItem = React.forwardRef<HTMLDivElement, DialogItemProps>(
  (props, forwardedRef) => {
    const { children, dropdownSetOpen, triggerChildren, action, ...itemProps } =
      props;
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <DropdownMenu.Item
            {...itemProps}
            ref={forwardedRef}
            className=""
            onSelect={(event) => {
              event.preventDefault();
            }}
            asChild
          >
            {triggerChildren}
          </DropdownMenu.Item>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/60 z-10" />
          <AlertDialog.Content className="w-[90vw] max-w-[450px] max-h-[50vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1e1e1e] rounded-md p-6 z-20">
            {children}
            <div className="flex justify-end w-full gap-4 mt-2">
              <AlertDialog.Cancel asChild>
                <button
                  className="bg-slate-200 px-2 py-1 rounded-md text-gray-700 focus:outline-none hover:bg-gray-300"
                  onClick={() => dropdownSetOpen(false)}
                >
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
                  onClick={action}
                >
                  Confirm
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    );
  }
);

DialogItem.displayName = "DialogItem";

export default UserActionsDropdown;
