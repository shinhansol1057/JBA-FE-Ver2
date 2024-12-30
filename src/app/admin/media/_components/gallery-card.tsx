// app/admin/gallery/_components/gallery-card.tsx
import { Button, Modal, message, Tag, Image } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/axios/authApi";
import { Gallery } from "../api";

interface Props {
  gallery: Gallery;
}

const GalleryCard = ({ gallery }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 썸네일 이미지 섹션 */}
        <div className="sm:col-span-1">
          <Image
            src={
              gallery.thumbnail || "https://www.irisoele.com/img/noimage.png"
            }
            alt={gallery.title}
            className="rounded-lg object-cover w-full"
            style={{ aspectRatio: "16/9" }}
            fallback="https://www.irisoele.com/img/noimage.png"
          />
        </div>

        {/* 정보 섹션 */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">제목:</span>
            <span className="ml-2">{gallery.title}</span>
          </div>

          <div>
            <span className="font-semibold">이메일:</span>
            <span className="ml-2">{gallery.email}</span>
          </div>

          <div>
            <span className="font-semibold">공식여부:</span>
            <Tag
              className="ml-2"
              color={gallery.isOfficial ? "green" : "default"}
            >
              {gallery.isOfficial ? "공식" : "일반"}
            </Tag>
          </div>

          <div>
            <span className="font-semibold">상태:</span>
            <span className="ml-2">{gallery.galleryStatus}</span>
          </div>

          <div>
            <span className="font-semibold">생성일:</span>
            <span className="ml-2">
              {new Date(gallery.createAt).toLocaleDateString()}
            </span>
          </div>

          <div>
            <span className="font-semibold">수정일:</span>
            <span className="ml-2">
              {gallery.updateAt
                ? new Date(gallery.updateAt).toLocaleDateString()
                : "-"}
            </span>
          </div>

          {/* 버튼 섹션 */}
          <div className="sm:col-span-2">
            <div className="flex flex-wrap items-center gap-1 mt-2">
              <Button
                type="link"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => router.push(`/gallery/${gallery.galleryId}`)}
              >
                조회
              </Button>
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                onClick={() =>
                  router.push(`/gallery/update/${gallery.galleryId}`)
                }
              >
                수정
              </Button>
              <Button
                type="link"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => {
                  Modal.confirm({
                    title: "갤러리 삭제",
                    content: "정말로 이 갤러리를 삭제하시겠습니까?",
                    okText: "삭제",
                    cancelText: "취소",
                    onOk: async () => {
                      try {
                        await authApi.delete(
                          `/v1/api/admin/gallery/${gallery.galleryId}`,
                        );
                        message.success("갤러리가 삭제되었습니다.");
                        router.refresh();
                      } catch (error) {
                        message.error("갤러리 삭제 중 오류가 발생했습니다.");
                        console.error("갤러리 삭제 실패:", error);
                      }
                    },
                  });
                }}
                danger
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
