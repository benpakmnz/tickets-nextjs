import { tasksStatusValues } from "@/types";

const BoardHeader = () => {
  return (
    <div className="ticket-container mt-10">
      <div className="ticket-card"></div>
      {tasksStatusValues.map((status) => (
        <div key={status} className="task-card-header">
          <h6 className="font-semibold">{status}</h6>
        </div>
      ))}
    </div>
  );
};

export default BoardHeader;
