import React from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};
const AddAttachedFileBox = ({ files, setFiles }: Props) => {
  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFiles((prevState) => {
        let result = [...prevState];
        for (let i: number = 0; i < files.length; i++) {
          const file = files.item(i);
          if (file) result.push(file);
        }
        return result;
      });
    }
  };

  // 추가된 파일 삭제 로직
  const handleDeleteUploadFiles = (indexToRemove: number) => {
    setFiles((prev) =>
      prev.filter((f: File, index: number) => index !== indexToRemove),
    );
  };
  return (
    <div
      className={
        "flex flex-col min-h-28 bg-white rounded-lg shadow-xl my-5 p-2.5 md:p-5"
      }
    >
      <div
        className={
          "relative inline-block overflow-hidden cursor-pointer text-center " +
          "font-bold rounded-lg bg-black hover:bg-[#4B4B4B] text-white p-2.5 " +
          "text-sm sm:text-base md:text-lg"
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
        {files?.map((file: File, i: number) => {
          return (
            <li
              key={i}
              className={
                "flex items-center text-sm sm:text-base md:text-lg m-2.5"
              }
            >
              <p>- {file.name}</p>
              <IoClose
                className={"cursor-pointer text-lg"}
                onClick={() => handleDeleteUploadFiles(i)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddAttachedFileBox;
