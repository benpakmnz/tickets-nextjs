"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePicker from "../DatePicker";
import { ITicketAttrs, ticketStatusOptions } from "@/types";
import "./styles.css";
import { BASE_URI } from "../../../constants";

const TicketForm = ({ initialData }: { initialData?: ITicketAttrs }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ITicketAttrs>(
    initialData || {
      title: "",
      description: "",
      category: "ticket",
      priority: 0,
      status: "new",
      owner: "",
      dueDate: "",
      tasks: [],
    }
  );

  useEffect(() => initialData && setFormData(initialData), [initialData]);

  const categoryOptions = ["ticket", "bug"];

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
    const path = `${BASE_URI}/api/Tasks/${initialData?.id || ""}`;
    const res = await fetch(path, {
      method: initialData?.id ? "PUT" : "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to create Ticket.");
    } else {
      router.back();
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold">
        {formData.id ? "Ticket Information" : "Create New Ticket"}
      </h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="form-item w-1/2">
          <Label>Category</Label>
          <Select
            name="category"
            defaultValue={formData.category}
            onValueChange={(value) => handleChange({ value, name: "category" })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
            <Label className="text-left">Priority</Label>
            <Input
              id="priority"
              name="priority"
              type="number"
              value={formData.priority}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="form-item w-1/2">
            <Label className="block">Due Dates</Label>
            <DatePicker
              initialDate={
                formData.dueDate ? new Date(formData.dueDate) : undefined
              }
              handleSelection={(date) =>
                handleChange({ name: "dueDate", value: date })
              }
            />
          </div>
          <div className="form-item w-1/2">
            <Label className="block">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => handleChange({ value, name: "status" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ticketStatusOptions.map((opt) => (
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
