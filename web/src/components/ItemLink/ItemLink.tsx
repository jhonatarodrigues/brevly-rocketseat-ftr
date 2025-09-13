import { Copy, Trash2 } from "lucide-react";
import { LittleButton } from "../LitteButton/LitteButton";

type ItemLinkProps = {
  originalLink: string;
  shortLink: string;
  accessCount: number;
  onDelete?: () => void;
  onCopy?: () => void;
};

export const ItemLink = ({
  originalLink,
  shortLink,
  accessCount,
  onDelete,
  onCopy,
}: ItemLinkProps) => {
  return (
    <div className="w-full items-center justify-between flex py-4 border-b border-gray-300">
      <div className="max-w-[40%] md:max-w-full">
        <p className="text-blue-base font-semibold text-sm mb-0 truncate">
          {shortLink}
        </p>
        <p className="text-gray-500 font-regular text-sm mb-0 truncate">
          {originalLink}
        </p>
      </div>

      <div className="flex items-center">
        <p className="text-gray-500 font-regular text-sm mb-0 px-5">
          {accessCount} acessos
        </p>
        <LittleButton
          lucideIcon={<Copy className="size-4 text-gray-600" />}
          onClick={onCopy}
        />
        <LittleButton
          className="ml-1"
          lucideIcon={<Trash2 className="size-4 text-gray-600" />}
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
