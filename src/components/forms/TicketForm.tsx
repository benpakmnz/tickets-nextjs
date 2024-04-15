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
import { DatePicker } from "../DatePicker";
import { ITicketAttrs } from "@/types";

const TicketForm = ({ initialData }: { initialData: ITicketAttrs }) => {
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
  const statusOptions = ["approved", "committed", "done", "new"];
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
    const path = initialData?.id
      ? `http://localhost:3000/api/Tickets/${initialData.id}`
      : "http://localhost:3000/api/Tickets";
    const res = await fetch(path, {
      method: initialData?.id ? "PUT" : "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to create Ticket.");
    }
    router.back();
    router.refresh();
  };

  return (
    <>
      <h1 className="text-2xl">
        {initialData?.id ? "Ticket Information" : "Create New Ticket"}
      </h1>
      <form className="grid gap-4 py-4" method="post" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1">
            <Label>Category</Label>
            <Select name="category" defaultValue={formData.category}>
              <SelectTrigger onChange={handleChange}>
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
        </div>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1">
            <Label className="w-full">Due Dates</Label>
            <DatePicker
              initialDate={
                formData.dueDate ? new Date(formData.dueDate) : undefined
              }
              handleSelection={(date) =>
                handleChange({ name: "dueDate", value: date })
              }
            />
          </div>
          <div className="grid grid-cols-1">
            <Label>Status</Label>
            <Select name="status" defaultValue={formData.status}>
              <SelectTrigger onChange={handleChange}>
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
