// components/ui/Button.tsx

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button = ({
  children,
  loading,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading || disabled}
      className="w-full rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white 
      transition hover:bg-primary-600 active:bg-primary-700 disabled:cursor-not-allowed 
      disabled:opacity-60"
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
