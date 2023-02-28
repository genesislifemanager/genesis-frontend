import { PlusCircleIcon } from "@heroicons/react/24/outline";

function SelectedDay() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Today</h1>
      <div className="mt-4 px-4">
        <div className="border border-black flex justify-center px-2 py-2 rounded">
          <PlusCircleIcon width={20} height={20} />
        </div>
        <div className="grid grid-cols-1 border-black mt-2">
          <div className="border border-black px-4 py-2 rounded">
            <span className="block">SDGP Implementation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedDay;
