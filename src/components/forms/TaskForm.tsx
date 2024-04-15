"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ITicketAttrs, TaskStatus } from "@/types";

const TicketForm = ({
  initialData,
  ticketId,
}: {
  initialData: ITicketAttrs;
  ticketId?: string;
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ITicketAttrs>(
    initialData || {
      title: "",
      description: "",
      status: "new",
      owner: "",
    }
  );
  const statusOptions: TaskStatus[] = [
    "backlog",
    "todo",
    "in progress",
    "done",
  ];

  const handleChange = (e: any) => {
    const value = e.target?.value || e.value;
    const name = e.target?.name || e.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const path = initialData?.id
      ? `http://localhost:3000/api/Tasks/${initialData.id}`
      : "http://localhost:3000/api/Tasks";

    const res = await fetch(path, {
      cache: "no-store",
      method: initialData?.id ? "PUT" : "POST",
      body: JSON.stringify({ ...formData, ticketId: ticketId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to create Task.");
    }
    router.back();
    router.refresh();
  };

  return (
    <>
      <h1 className="text-2xl">
        {initialData?.id ? "Task Information" : "Create New Task"}
      </h1>
      <form className="grid gap-4 py-4" method="post" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title" className="text-left">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="items-center">
          <Label htmlFor="description" className="text-left">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid items-center">
            <Label>Owner</Label>
            <Input
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </div>
          <div className="grid items-center">
            <Label>Status</Label>
            <Select
              name="status"
              defaultValue={formData.status}
              onValueChange={(value) => handleChange({ value, name: "status" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button>Save</Button>
      </form>
    </>
  );
};

export default TicketForm;
