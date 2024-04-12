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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { serverApi } from "@/lib/data/server-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, X } from "lucide-react";
import * as z from "zod";

import SelectGroupInScope from "@/components/group/select-group-in-scope";
import { postServer } from "@/lib/data/post-api";
import { Club, PRIVACY_TYPE } from "@/lib/interface";

export default function CreateProjectForm({ prefilled }: { prefilled: any }) {
  const projectFormSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: "Name is missing",
      })
      .min(2, {
        message: "Name is too short, min 2 char",
      })
      .max(30, {
        message: "Name is too long, max 30 char",
      })
      .refine(
        (val) => {
          const trimmed = val.replace(/\s+/g, " ");
          return trimmed.length >= 2 && trimmed.length <= 30;
        },
        {
          message: "Name is too short or too long",
        }
      ),
    begin_date: z.string({
      required_error: "You are missing the begin date",
    }),
    end_date: z.string({
      required_error: "You are missing the end date",
    }),
    description: z
      .string({
        required_error: "Description is missing",
      })
      .trim()
      .min(10, "Description is too short, min 10 char")
      .max(1000, "Description is too long, max 1000 char"),
    tags: z
      .array(z.string(), {
        required_error: "missing_category",
      })
      .max(5, "too_many_categories_max_5"),
    scope: z.string(),
    image: z.string().optional(),
  });

  type CreateProjectFormValues = z.infer<typeof projectFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<CreateProjectFormValues> = {
    scope: PRIVACY_TYPE.PUBLIC,
  };

  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag

  const [selectGroupDialog, setSelectGroupDialog] = useState<boolean>(false);
  const [myGroups, setMyGroups] = useState<Club[]>([]);
  const [myGroupsLoading, setMyGroupsLoading] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<Club[]>([]);
  const [noticeGroupSelectOpen, setNoticeGroupSelectOpen] =
    useState<boolean>(false);

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

  const clickTagsBadge = (_job_item: string) => {
    const currentTags = form.getValues("tags") || [];
    !currentTags.includes(_job_item.trim()) &&
      form.setValue("tags", [...currentTags, _job_item.trim()], {
        shouldValidate: true,
      });
    setNewTag(""); // Clear the input field for new tag
  };

  const handleNewTagChange = (e: any) => {
    setNewTag(e.target.value);
  };

  async function onSubmit(data: CreateProjectFormValues) {
    if (
      form.getValues("scope") === PRIVACY_TYPE.GROUP &&
      selectedGroup.length < 1
    ) {
      setNoticeGroupSelectOpen(true);
      return;
    }

    setLoading(true);

    if (file) {
      const uploadedImage = await uploadContent(file);
      data.image = uploadedImage ?? "";
    }

    if (present) {
      data.end_date = "";
    }
    const formattedName = data.name.replace(/\s+/g, " ").trim();
    let clubs;

    if (data.scope === PRIVACY_TYPE.GROUP) {
      clubs = selectedGroup.map((group) => group.id);
    }

    // Create the project
    const result = await postServer('projects',JSON.stringify({
      image: data.image,
      name: formattedName,
      description: data.description,
      begin_date: data.begin_date,
      end_date: data.end_date,
      tags: data.tags,
      scope: data.scope,
      clubs: clubs,
    }));

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      router.push(`/project/${result.data.id}`);
    } else {
      setLoading(false);
    }
  }

  const selectFile = (file: any) => {
    setFile(file);
  };

  // Select Group
  const onSelectGroup = (_groups: Club[]) => {
    setSelectedGroup(_groups);
  };

  const onClickDeleteClub = (clickedGroup: Club) => {
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
        const result = await serverApi(`/clubs/my`);

        if (result.status === "success") {
          setMyGroups(result.data);
        }
        setMyGroupsLoading(false);
      }
    };

    fetchMyGroupsData();
  }, [selectGroupDialog, myGroups.length]);

  useEffect(() => {
    if (prefilled) {
      form.setValue("name", prefilled.name);
      form.setValue("description", prefilled.description);
      //need to conver the prefilled.begin_date to 2024-01-01
      console.log(prefilled.begin_date);
      const begin_date = new Date(prefilled.begin_date).toLocaleString(
        "sv-SE",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );

      console.log(prefilled.end_date);

      const end_date = new Date(prefilled.end_date).toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      form.setValue("begin_date", begin_date);
      form.setValue("end_date", end_date);
      form.setValue("tags", prefilled.tags);
    }
  }, [prefilled, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
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
                      <ul className="space-y-2 text-body_m text-accent-on-primary">
                        {Object.values(PRIVACY_TYPE).map((type, index) => (
                          <li key={index}>{type}</li>
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
                  className="flex flex-row flex-wrap items-center gap-6"
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
                          <Badge className="cursor-pointer">Select Group</Badge>
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
                      selectedGroup.map((group: Club, index: number) => {
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
                                onClick={() => onClickDeleteClub(group)}
                              ></X>
                            </div>
                          </Badge>
                        );
                      })}
                  </div>
                )}

                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                Name
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl>
                  <Input
                    placeholder="Enter project name"
                    {...field}
                    {...form.register("name")}
                  />
                </FormControl>

                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormInlineItem className="relative items-start mt-4">
          <FormInlineLabel className="mt-5">
            Time Period
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
                    <div className="absolute inset-0 px-4 py-5 rounded-sm text-title_m text-text-placeholder">
                      In progress
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="absolute right-0 flex justify-end gap-1 pb-2 bottom-full">
            <Checkbox
              id="present"
              onCheckedChange={(_value: boolean) => {
                form.setValue("end_date", "");
                setPresent(!present);
              }}
            />
            <Label htmlFor="present">
              <span>Present</span>
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
                <FormControl>
                  <Textarea
                    placeholder="Enter project description"
                    className="p-4 resize-none min-h-[132px] bg-background-layer-1"
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
          name="tags"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                Category
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl>
                  <div>
                    <Input
                      placeholder="Enter category"
                      value={newTag}
                      onChange={handleNewTagChange}
                      onKeyDown={handleKeyDown}
                      disabled={
                        form.getValues("tags") &&
                        form.getValues("tags").length > 4
                      }
                    />

                    <FormMessage />
                  </div>
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
        <FormInlineItem className="items-start">
          <FormInlineLabel className="items-start">Image</FormInlineLabel>

          <MediaUploader
            key="image"
            onFileSelected={selectFile}
            width={140}
            height={140}
          >
            <div>
              <div className="mb-1 text-title_s text-text-secondary">
                Select Image
              </div>
            </div>
          </MediaUploader>
        </FormInlineItem>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>

          <Button type="submit" disabled={loading}>
            {/* || !form.formState.isValid */}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
