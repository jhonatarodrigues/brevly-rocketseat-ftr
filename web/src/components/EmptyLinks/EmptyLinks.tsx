import { Link } from "lucide-react";

export const EmptyLinks = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-8">
      <Link className="size-8 mb-3 text-gray-400 " />
      <p className="text-gray-500 text-sm uppercase text-xs">
        ainda não existem links cadastrados
      </p>
    </div>
  );
};
