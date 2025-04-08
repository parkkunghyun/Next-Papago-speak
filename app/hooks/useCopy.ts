import { toast } from "react-toastify";

export const useCopyToClipboard = () => {
  const copyToClipboard = (text: string) => {
    if (!text) return toast.error("복사할 내용이 없습니다!");

    navigator.clipboard.writeText(text);
    toast.success("복사되었습니다!");
  };

  return { copyToClipboard };
};
