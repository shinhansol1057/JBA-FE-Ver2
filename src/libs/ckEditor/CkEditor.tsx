"use client";
import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  AccessibilityHelp,
  Alignment,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  ClassicEditor,
  CloudServices,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  HorizontalLine,
  ImageBlock,
  ImageInline,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import translations from "ckeditor5/translations/ko.js";

import "ckeditor5/ckeditor5.css";
import { Api } from "@/services/axios/Api";
import { GetFileType } from "@/types/commonType";

type Props = {
  ckData: string;
  setCkData: React.Dispatch<React.SetStateAction<string>>;
  setNewCkImgUrls: React.Dispatch<React.SetStateAction<GetFileType[]>>;
};

export default function CkEditor({
  ckData,
  setCkData,
  setNewCkImgUrls,
}: Props) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "specialCharacters",
        "horizontalLine",
        "link",
        "mediaEmbed",
        "insertTable",
        "blockQuote",
        "|",
        "alignment",
      ],
      shouldNotGroupWhenFull: true,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      Autosave,
      BlockQuote,
      Bold,
      CloudServices,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      HorizontalLine,
      ImageBlock,
      ImageInline,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      MediaEmbed,
      Paragraph,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [8, 10, 12, 14, "default", 18, 20, 22, 26, 30, 34, 38, 42],
      supportAllValues: true,
    },
    image: {
      toolbar: [
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },

    language: "ko",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    placeholder: "게시글을 작성해주세요.",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
    translations: [translations],
    mediaEmbed: {
      previewsInData: true,
    },
    extraPlugins: [uploadPlugin],
  };

  const customUploadAdapter = (loader: any) => {
    // (2)
    return {
      upload() {
        return new Promise((resolve, reject): void => {
          const data: FormData = new FormData();
          loader.file.then((file: any): void => {
            data.append("uploadFile", file);
            Api.post("/v1/api/disk/ckeditor", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
              .then((res) => {
                setNewCkImgUrls((prevState) => {
                  return [
                    ...prevState,
                    { fileUrl: res.data.url, fileName: res.data.fileName },
                  ];
                });
                resolve({
                  default: res.data.url,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor: any) {
    // (3)
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any,
    ) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <div>
      <div className="main-container">
        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  editor={ClassicEditor}
                  // @ts-ignore
                  config={editorConfig}
                  data={ckData !== null ? ckData : ""}
                  onChange={(event, editor): void => {
                    setCkData(editor.getData()); // 에디터 작성 내용 저장
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
