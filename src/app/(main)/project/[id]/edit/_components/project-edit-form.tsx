"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { uploadContent } from "@/lib/upload";

import MediaUploader from "@/components/extra/media-uploader";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormInlineItem,
  FormInlineLabel,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import SelectGroupInScope from "@/components/group/select-group-in-scope";
import { patchServer } from "@/lib/data/post-api";
import { serverApi } from "@/lib/data/server-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, X } from "lucide-react";
import * as z from "zod";

const PRIVACY_TYPE = {
  PUBLIC: "public",
  PRIVATE: "private",
  GROUP: "group",
};

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your project's name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your project's name must not be longer than 30 characters.",
    }),
  begin_date: z.string(),
  end_date: z.string(),
  description: z.string().max(5000).min(4),
  tags: z.array(z.string()),
  scope: z.string(),
  image: z.string().optional(),
  type: z.string().optional(),
  id: z.string(),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;

export default function ProjectEditForm({
  defaultValues,
}: {
  defaultValues?: Partial<ProfileFormValues>;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag


  const [selectGroupDialog, setSelectGroupDialog] = useState<boolean>(false);
  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [myGroupsLoading, setMyGroupsLoading] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<any[]>([]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      const currentTags = form.getValues("tags") || [];
      !currentTags.includes(newTag.trim()) &&
        form.setValue("tags", [...currentTags, newTag.trim()], {
          shouldValidate: true,
        });
      setNewTag(""); // Clear the input field for new tag
    }
  };

  const handleNewTagChange = (e: any) => {
    setNewTag(e.target.value);
  };

  const clickTagsBadge = (_job_item: string) => {
    const currentTags = form.getValues("tags") || [];
    !currentTags.includes(_job_item.trim()) &&
      form.setValue("tags", [...currentTags, _job_item.trim()], {
        shouldValidate: true,
      });
    setNewTag(""); // Clear the input field for new tag
  };

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    if (file) {
      const uploadedImage = await uploadContent(file);
      data.image = uploadedImage ?? "";
    }

    if (present) {
      data.end_date = "";
    }

    const result = await patchServer(
      `projects/${data.id}`,
      JSON.stringify({
        image: data.image,
        name: data.name,
        description: data.description,
        begin_date: data.begin_date,
        end_date: data.end_date,
        tags: data.tags,
        scope: data.scope,
        type: data.type,
      })
    );

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Project Edit successfully",
      });
      router.push(`/project/${data.id}`);
    } else {
      setLoading(false);
    }
  }

  const selectFile = (file: File | null, base64: string | null) => {
    setFile(file);
  };

  // Select Group
  const onSelectGroup = (_groups: any[]) => {
    setSelectedGroup(_groups);
  };

  const onClickDeleteany = (clickedGroup: any) => {
    setSelectedGroup(
      selectedGroup.filter((_group) => {
        return _group.id !== clickedGroup.id;
      })
    );
  };

  useEffect(() => {
    const fetchMyGroupsData = async () => {
      if (selectGroupDialog && myGroups.length < 1) {
        setMyGroupsLoading(true);
        const result = await serverApi(`/anys/my`);

        if (result.status === "success") {
          setMyGroups(result.data);
        }
        setMyGroupsLoading(false);
      }
    };

    fetchMyGroupsData();
  }, [selectGroupDialog, myGroups.length]);

  useEffect(() => {
    if (defaultValues?.end_date) {
      setPresent(false);
    } else {
      setPresent(true);
    }
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                Project Name
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl className="mb-2">
                  <Input
                    placeholder="Enter your project name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
            Project Type
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="max-w-[300px]">
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a project type"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                      <SelectItem  value={"hackathon"}>
                        Hackathon
                      </SelectItem>
                      <SelectItem  value={"side_project"}>
                        Side Project
                      </SelectItem>
                      <SelectItem  value={"client_project"}>
                        Client Project
                      </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormInlineItem className="relative items-start">
          <FormInlineLabel className="mt-5">
            Period
            <span className="ml-1 text-state-error">*</span>
          </FormInlineLabel>
          <div className="flex flex-row flex-wrap items-center w-full gap-2 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="begin_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input type="date" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <span>~</span>
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem
                  className={`w-full relative space-y-0 ${
                    present && "opacity-40"
                  }`}
                >
                  <Input type="date" {...field} disabled={present} />
                  {present && (
                    <div className="absolute inset-0 px-4 py-5 rounded-sm text-title_m text-text-placeholder bg-background-layer-2">
                      In Progress
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="absolute right-0 flex justify-end gap-1 pb-3 bottom-full">
            <Checkbox
              id="present"
              checked={present}
              onCheckedChange={(_value: boolean) => {
                form.setValue("end_date", "");
                setPresent(!present);
              }}
            />
            <Label htmlFor="present">
              Present
            </Label>
          </div>
        </FormInlineItem>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel>
                Description
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl className="mb-1">
                  <Textarea
                    placeholder="enter project description"
                    className="p-4 resize-none min-h-[132px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormInlineItem className="items-start">
          <FormInlineLabel className="items-start">
            Image
          </FormInlineLabel>

          <MediaUploader
            defaultImage={
              defaultValues?.image
                ? `https://ipfs.io/ipfs/${defaultValues?.image}`
                : ""
            }
            key="image"
            onFileSelected={selectFile}
            width={140}
            height={140}
          >
            <div>
              <div className="mb-1 text-2xs text-gray-600">
                Select your image
              </div>

            </div>
          </MediaUploader>
        </FormInlineItem>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                Category
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl className="mb-2">
                  <Input
                    placeholder="enter your category"
                    value={newTag}
                    onChange={handleNewTagChange}
                    onKeyDown={handleKeyDown}
                    disabled={
                      form.getValues("tags") &&
                      form.getValues("tags").length > 4
                    }
                  />
                </FormControl>

                <div className="flex flex-wrap items-start gap-2 mt-3">
                  {form.getValues("tags") &&
                    form.getValues("tags")?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        shape="md"
                        className="flex items-center gap-1.5 max-w-[200px]"
                      >
                        <div className="flex">
                          <div className="w-full truncate">{tag}</div>

                          <X
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => {
                              const currentTags = form.getValues("tags") || [];
                              const newTags = currentTags.filter(
                                (t) => t !== tag
                              );
                              form.setValue("tags", newTags, {
                                shouldValidate: true,
                              });
                            }}
                          ></X>
                        </div>
                      </Badge>
                    ))}
                </div>
              </div>
            </FormInlineItem>
          )}
        />

        <FormField
          control={form.control}
          name="scope"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="flex items-center h-10">
                Scope
                <span className="ml-1 text-state-error">*</span>

                <Popover>
                  <PopoverTrigger className="ml-2">
                    <AlertCircle className="w-4 h-4"></AlertCircle>
                  </PopoverTrigger>

                  <PopoverContent className="max-w-full p-0">
                    {/* plan to make variant */}
                    <Card className="max-w-[500px] bg-background-tooltip rounded-sm p-4 ">
                      <ul className="space-y-2 text-sm text-primary-accent">
                        {Object.values(PRIVACY_TYPE).map((type, index) => (
                          <li key={index}>
                            {type}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </PopoverContent>
                </Popover>
              </FormInlineLabel>

              <div>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row flex-wrap gap-6"
                >
                  {Object.values(PRIVACY_TYPE).map((type) => (
                    <FormItem
                      key={type}
                      className="flex flex-wrap items-center space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>

                      <FormLabel className="font-normal capitalize">
                        {type}
                      </FormLabel>
                    </FormItem>
                  ))}

                  {form.getValues("scope") == PRIVACY_TYPE.GROUP && (
                    <>
                      <Dialog
                        open={selectGroupDialog}
                        onOpenChange={setSelectGroupDialog}
                      >
                        <DialogTrigger>
                          <Badge className="cursor-pointer">
                            Select club
                          </Badge>
                        </DialogTrigger>

                        <DialogContent className="max-w-[720px] gap-0 px-8">
                          <SelectGroupInScope
                            myGroups={myGroups}
                            selectedGroup={selectedGroup}
                            onSelectGroup={onSelectGroup}
                            loading={myGroupsLoading}
                          />
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </RadioGroup>

                {form.getValues("scope") == PRIVACY_TYPE.GROUP && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedGroup.length > 0 &&
                      selectedGroup.map((group: any, index: number) => {
                        return (
                          <Badge
                            shape="outline"
                            className="gap-2 my-1.5"
                            key={index}
                          >
                            <div className="flex gap-2">
                              <div className="w-5 h-5 overflow-hidden rounded-full shrink-0">
                                <Image
                                  src={`https://ipfs.io/ipfs/${group.image}`}
                                  alt={group.name}
                                  width="20"
                                  height="20"
                                ></Image>
                              </div>

                              <div className="text-label_m max-w-[120px] truncate">
                                {group.name}
                              </div>

                              <X
                                className="w-5 h-5 cursor-pointer shrink-0 text-text-secondary"
                                onClick={() => onClickDeleteany(group)}
                              ></X>
                            </div>
                          </Badge>
                        );
                      })}
                  </div>
                )}
              </div>

              <FormMessage />
            </FormInlineItem>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          <Button
            type="submit"
            disabled={loading || !form.formState.isValid}
          >
            Edit
          </Button>
        </div>
      </form>
    </Form>
  );
}
