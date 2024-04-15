import { statusValues } from "@/types";

const BoardHeader = () => {
  return (
    <div className="ticket-container mt-10">
      <div className="ticket-card"></div>
      {statusValues.map((status) => (
        <div className="task-card-header">
          <h6 className="font-semibold">{status}</h6>
        </div>
      ))}
    </div>
  );
};

export default BoardHeader;
