import { ChevronRightIcon } from "@heroicons/react/24/solid";

function Settings() {
  return (
    <div className="mt-4 border-black">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <h1 className="text-xl mt-4 font-semibold">Account Settings</h1>
      <div className="mt-4">
        <div
          className="border  cursor-pointer flex justify-between border-black items-center px-4 py-2 rounded"
        >
          <span className="block text-base">Profile</span>
          <div className="flex items-center">
            <ChevronRightIcon width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
