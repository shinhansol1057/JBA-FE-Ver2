export const handleDownload = async (fileUrl: string, name: string) => {
  if (typeof window !== "undefined") {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(
      new Blob([blob], { type: blob.type || "application/octet-stream" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = name; // 여기서 원하는 파일 이름을 지정합니다.
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
};
