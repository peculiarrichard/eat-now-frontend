import { stringToCron } from "../../utils/cronconverter";

export const ReminderCategory = ({
  category,
  scheduleFrequency,
  onChange,
  options,
}: {
  category: string;
  scheduleFrequency: string;
  onChange: (e: any) => void;
  options: string[];
}) => {
  return (
    <>
      {category === "cheats" ? (
        <label
          htmlFor="schedule"
          className="block text-sm font-[500] mb-2 leading-normal">
          When*:
          <div
            className={`bg-white border-gray-200 flex border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
            <input
              type="text"
              id="schedule"
              value={scheduleFrequency}
              className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g., Tomorrow at 5pm"
            />
          </div>
          *Cheat meals are once in a while thing. Choose a future date, e.g.,
          Tomorrow at 5pm
        </label>
      ) : (
        category && (
          <label
            htmlFor="schedule"
            className="block text-sm font-[500] mb-2 leading-normal">
            Frequency*:
            <div
              className={`bg-white border-gray-200 flex border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
              <select
                id="schedule"
                className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
                onChange={(e) => onChange(stringToCron(e.target.value))}>
                <option value="">Select Frequency</option>
                {options.map((option: string, index: number) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </label>
        )
      )}
    </>
  );
};
