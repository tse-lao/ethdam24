"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { deleteServer } from "@/lib/data/post-api";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteProject({
  projectData,
}: {
  projectData: any;
}) {
  const [deleteInput, setDeleteInput] = React.useState<string>("");
  const router = useRouter();
  //TODO: add a delete project function here.

  async function confirmDelete() {

    const result = await deleteServer(`/projects/${projectData.id}`);

    if (result.error)
      return toast({ title: "Error", description: result.error.message });

    toast({
      title: "Project Deleted",
      description: "Your project has been deleted.",
    });
    router.push("/project");
  }
  return (
    <Dialog>
      <DialogTrigger className="w-full mt-5 text-center">
        <Button variant="secondary" className="max-w-full" size="lg">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 px-8">
        <header className="flex flex-col gap-4">
          <h5 className="text-subhead_s">Delete your project</h5>
          <p className="text-body_m">
            Type in your project name <strong>{projectData.name}</strong>{" "}
            to delete the project
          </p>
        </header>

        <Input
          type="text"
          onChange={(e) => setDeleteInput(e.target.value)}
          value={deleteInput}
          placeholder="type here to delete."
        />

        <div className="flex justify-center gap-2">
          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="lg"
            variant="destructive"
            disabled={deleteInput != projectData.name}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
