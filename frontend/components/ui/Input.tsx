interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none 
        transition focus:ring-2 focus:ring-primary-500 ${
          error
            ? "border-red-400 bg-red-50 focus:ring-red-400"
            : "border-gray-300 bg-white focus:border-primary-500"
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
