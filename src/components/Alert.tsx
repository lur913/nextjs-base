const Alert = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-2 border-blue-500 p-4 rounded-xl text-white font-bold">{children}</div>;
};

export default Alert;
