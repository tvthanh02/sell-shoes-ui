import SkeletonLoad from "./SkeletonLoad";

function SkeletonLoadCard() {
  return (
    <div className="relative w-full flex flex-col gap-4 py-3 px-3 rounded-lg border border-solid border-[#f1f1f1]  overflow-hidden">
      <div className="overflow-hidden w-full">
        <SkeletonLoad className="w-full aspect-square" />
      </div>
      <div className="flex flex-col gap-2">
        <SkeletonLoad className="w-full h-[1.7rem]" />

        <SkeletonLoad className="w-[40%] h-[1.7rem]" />

        <SkeletonLoad className="w-[30%] h-[1.7rem]" />
      </div>
    </div>
  );
}

export default SkeletonLoadCard;
