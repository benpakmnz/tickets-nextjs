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
import { ITaskAttrs, tasksStatusValues } from "@/types";
import { BASE_URI } from "../../../constants";

const TicketForm = ({
  initialData,
  ticketId,
}: {
  initialData: ITaskAttrs;
  ticketId?: string;
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ITaskAttrs>(
    initialData || {
      title: "",
      description: "",
      status: "backlog",
      owner: "",
    }
  );

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
    const path = `${BASE_URI}/Tasks/${initialData?.id || ""}`;
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
    } else {
      router.back();
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold">
        {initialData?.id ? "Task Information" : "Create New Task"}
      </h1>
      <form className="grid gap-4 py-4" method="post" onSubmit={handleSubmit}>
        <div className="form-item w-full">
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
        <div className="form-item w-full">
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
        <div className="flex gap-4">
          <div className="form-item w-1/2">
            <Label>Owner</Label>
            <Input
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </div>
          <div className="form-item w-1/2">
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
                {tasksStatusValues.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-4">
          <Button className="w-1/4 " variant="default">
            Save
          </Button>
          <Button
            className="w-1/5"
            variant="outline"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default TicketForm;
