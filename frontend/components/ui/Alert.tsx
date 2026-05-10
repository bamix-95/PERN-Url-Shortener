interface AlertProps {
  message: string;
  type: "error" | "success";
}

export const Alert = ({ message, type }: AlertProps) => {
  return (
    <div
      className={`rounded-lg px-4 py-3 text-sm font-medium ${
        type === "error"
          ? "bg-red-50 text-red-600 border border-red-200"
          : "bg-primary-50 text-primary-700 border border-primary-200"
      }`}
    >
      {message}
    </div>
  );
};
