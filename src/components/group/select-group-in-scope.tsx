"use client";
import { useEffect, useState } from "react";



import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import GroupCheckboxListItem from "./group-checkbox-list-item";



export default function SelectGroupInScope({

  myGroups,
  selectedGroup,
  onSelectGroup,
  loading,
}: {

  myGroups: any[];
  selectedGroup: any[];
  onSelectGroup: Function;
  loading: boolean;
}) {
  const [selectedTempGroup, setSelectedTempGroup] = useState<any[]>([]);

  useEffect(() => {
    setSelectedTempGroup([...selectedGroup]);
  }, [selectedGroup]);

  const onClickSelectGroup = () => {
    onSelectGroup([...selectedTempGroup]);
  };

  const onClickGroupListItem = (_group: any) => {
    setSelectedTempGroup((prevSelected) => {
      if (prevSelected.includes(_group)) {

        return prevSelected.filter((_prev_group) => _prev_group !== _group);
      } else {

        return [...prevSelected, _group];
      }
    });
  };

  return (
    <div>
      <h3 className="mb-4 text-subhead_s">
        Select your group
      </h3>

      <div className="mb-6 text-body_m">
        Please select the group you want to add to the project.
      </div>

      <div className="h-[232px] mb-6 overflow-auto">
        {loading && (
          <div className="py-5 text-center text-text-secondary">loading...</div>
        )}

        {myGroups &&
          myGroups.length > 0 &&
          myGroups.map((_group: any) => {
            if (_group.verified) {
              return (
                <GroupCheckboxListItem
                  group={_group}
                  isChecked={selectedTempGroup.includes(_group)}
                  onClick={() => onClickGroupListItem(_group)}
                  key={_group.id}
                />
              );
            }
          })}

        {!loading && myGroups?.length < 1 && <div>가입된 그룹이 없습니다.</div>}
      </div>

      <div className="flex justify-center gap-2">
        <DialogClose className="max-w-[212px] w-full">
          <Button size="lg" variant="secondary">
            Back
          </Button>
        </DialogClose>

        <DialogClose className="max-w-[212px] w-full">
          <Button
            size="lg"
            variant="primary"
            onClick={onClickSelectGroup}
            disabled={selectedTempGroup.length < 1}
          >
            Select
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
