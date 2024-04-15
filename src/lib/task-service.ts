export const getTask = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tasks/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch task");
    }
    return res.json();
  } catch (error) {
    console.error("Failed to get task", error);
    throw error;
  }
};

export const updateTaskStatus = async (id: string, status: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tasks/${id}/Status`, {
      cache: "no-store",
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.error("Failed to get tickets", error);
    throw error;
  }
};
