import MoreVert from "@mui/icons-material/MoreVert";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

const UserActionsDropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <MoreVert color="inherit" fontSize="medium" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          className="flex justify-center items-center group static outline-none bg-gray-100  dark:bg-[#585252] rounded-md min-w-16 max-w-[7rem] border border-gray-300 dark:border-[#343030] hover:bg-slate-200 dark:hover:bg-slate-600  focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400"
        >
          <DropdownMenu.Item
            className="flex text-center text-sm rounded-md transition duration-200 ease-in-out outline-none py-2 px-3"
            asChild
          >
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => console.log("Action")}
            >
              <DoNotDisturbIcon fontSize="inherit" />
              <span>Block</span>
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserActionsDropdown;
