interface ToggleSwitchProps {
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ label, isEnabled, onToggle }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-2xl shadow-md">
      <span className="text-xl text-gray-700">{label}</span>
      <button
        role="switch"
        aria-checked={isEnabled}
        onClick={onToggle}
        className={`relative inline-flex h-14 w-24 items-center rounded-full transition-colors duration-300 focus:outline-none
          ${isEnabled ? "bg-violet-500" : "bg-gray-300"}`}
      >
        <span
          className={`inline-block h-12 w-12 transform rounded-full bg-white shadow-lg transition-transform duration-300
            ${isEnabled ? "translate-x-11" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}
