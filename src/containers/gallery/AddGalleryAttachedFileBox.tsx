import React from "react";
import { IoClose } from "react-icons/io5";
import { FetchUploadFile } from "@/services/FileUploadApi";
import { getFileWithFileIdType } from "@/types/PostType";
import { getFileType } from "@/types/CommonType";
type Props = {
  files: getFileType[];
  setFiles: React.Dispatch<React.SetStateAction<getFileType[]>>;
};
const AddGalleryAttachedFileBox = ({ files, setFiles }: Props) => {
  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let fileList: File[] = [];
    if (files && files.length > 0) {
      for (let i: number = 0; i < files.length; i++) {
        fileList.push(files[i]);
      }
      FetchUploadFile(fileList).then((res) => {
        const fileResponses = res?.data.data;
        const request = fileResponses.map((item: getFileWithFileIdType) => {
          return { fileName: item.fileName, fileUrl: item.fileUrl };
        });
        setFiles(request);
      });
    }
  };

  // 추가된 파일 삭제 로직
  const handleDeleteUploadFiles = (indexToRemove: number) => {
    setFiles((prev) =>
      prev.filter((f: getFileType, index: number) => index !== indexToRemove),
    );
  };
  return (
    <div
      className={
        "flex flex-col min-h-[70px] bg-white rounded-[8px] shadow-xl my-[20px] p-[10px] md:p-[20px]"
      }
    >
      <div
        className={
          "relative inline-block overflow-hidden cursor-pointer text-center " +
          "font-bold rounded-[8px] bg-black hover:bg-[#4B4B4B] text-white p-[10px] " +
          "text-[12px] sm:text-[14px] md:text-[18px]"
        }
      >
        <p>파일 첨부</p>
        <input
          type="file"
          id="uploadFile"
          multiple
          onChange={(e) => handleUploadFiles(e)}
          className={
            "absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          }
        />
      </div>
      <ul>
        {files?.map((files: getFileType, i: number) => {
          return (
            <li
              key={i}
              className={
                "flex text-[12px] sm:text-[14px] md:text-[16px] m-[10px]"
              }
            >
              <p>- {files.fileName}</p>
              <IoClose
                className={"cursor-pointer "}
                onClick={() => handleDeleteUploadFiles(i)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddGalleryAttachedFileBox;
