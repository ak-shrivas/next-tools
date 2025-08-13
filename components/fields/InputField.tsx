type Props = {
    label: string;
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
    hint?: string;
  };
  
  export function InputField({ label, value, onChange, placeholder, hint }: Props) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          placeholder={placeholder}
          className="input"
        />
        {hint && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
    );
  }
  