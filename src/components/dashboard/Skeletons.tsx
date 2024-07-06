import { SkeletonText } from "@chakra-ui/react";

export const AllRemindersSkeleton = () => {
  return (
    <>
      <SkeletonText mt="4" noOfLines={10} spacing="4" skeletonHeight="4" />
    </>
  );
};
