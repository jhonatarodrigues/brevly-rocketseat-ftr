import { Copy, Trash2 } from "lucide-react";
import { LittleButton } from "../LitteButton/LitteButton";
import { useNavigate } from "react-router-dom";

type ItemLinkProps = {
  id: string;
  originalLink: string;
  shortLink: string;
  accessCount: number;
  onDelete?: () => void;
  onCopy?: () => void;
};

export const ItemLink = ({
  id,
  originalLink,
  shortLink,
  accessCount,
  onDelete,
  onCopy,
}: ItemLinkProps) => {
  const navigate = useNavigate();

  const handleUrlRedirect = () => {
    if (shortLink) {
      const newShortLink =
        shortLink.indexOf(import.meta.env.VITE_FRONTEND_URL) !== -1;
      if (newShortLink) {
        const code = shortLink.split("/").pop();

        navigate(`/${code}`, {
          state: { shortLink, originalLink, id },
        });
      } else {
        const code = shortLink
          .replace("http://", "")
          .replace("https://", "")
          .split("/")
          .shift();

        navigate(`/${code}`, {
          state: { shortLink, originalLink, id },
        });
      }
    }
  };

  return (
    <div className="w-full items-center justify-between flex py-4 border-b border-gray-300">
      <div className="max-w-[40%] md:max-w-full">
        <p
          className="text-blue-base font-semibold text-sm mb-0 truncate cursor-pointer hover:underline"
          onClick={handleUrlRedirect}
        >
          {shortLink}
        </p>

        <p className="text-gray-500 font-regular text-sm mb-0 truncate">
          {originalLink}
        </p>
      </div>

      <div className="flex items-center">
        <p className="text-gray-500 font-regular text-sm mb-0 px-5">
          {accessCount + ` ${accessCount <= 1 ? "acesso" : "acessos"}`}
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
