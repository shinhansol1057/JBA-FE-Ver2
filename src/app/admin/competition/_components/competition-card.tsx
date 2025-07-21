// app/admin/competition/_components/competition-card.tsx
import { Button, Modal, message, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  TrophyOutlined,
  TeamOutlined,
  FileOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/axios/authApi";
import { Competition } from "../type";

interface Props {
  competition: Competition;
}

const CompetitionCard = ({ competition }: Props) => {
  const router = useRouter();
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <span className="font-semibold">대회명:</span>
          <span className="ml-2">{competition.competitionName}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold shrink-0">부문:</span>
          <div className="flex flex-wrap gap-1 ml-2">
            {competition.divisions.map((division: string, index: number) => (
              <Tag
                key={competition.competitionId + ":_" + division + index}
                color="blue"
              >
                {division}
              </Tag>
            ))}
          </div>
        </div>

        <div>
          <span className="font-semibold">상태:</span>
          <Tag
            className="ml-2"
            color={
              competition.situation === "예정"
                ? "green"
                : competition.situation === "진행중"
                  ? "blue"
                  : "red"
            }
          >
            {competition.situation}
          </Tag>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <span className="font-semibold">기간:</span>
          <span className="ml-2">
            {new Date(competition.startDate).toLocaleDateString()} ~
            {new Date(competition.endDate).toLocaleDateString()}
          </span>
        </div>

        <div className="lg:col-span-1">
          <span className="font-semibold">작성자:</span>
          <span className="ml-2">{competition.userEmail}</span>
        </div>

        <div className="lg:col-span-1">
          <span className="font-semibold">등록일:</span>
          <span className="ml-2">
            {new Date(competition.createAt).toLocaleDateString()}
          </span>
        </div>

        <div className="col-span-full">
          <div className="flex flex-wrap items-center gap-1 mt-2">
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined />}
              onClick={() =>
                router.push(
                  `/jeju-competition/info/${competition.competitionId}`,
                )
              }
            >
              조회
            </Button>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() =>
                router.push(
                  `/jeju-competition/info/update/${competition.competitionId}`,
                )
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
                  title: "대회 삭제",
                  content: "정말로 이 대회를 삭제하시겠습니까?",
                  okText: "삭제",
                  cancelText: "취소",
                  onOk: async () => {
                    try {
                      await authApi.delete(
                        `/v1/api/admin/competition/${competition.competitionId}`,
                      );
                      message.success("대회가 삭제되었습니다.");
                      router.refresh();
                    } catch (error) {
                      message.error("대회 삭제 중 오류가 발생했습니다.");
                      console.error("대회 삭제 실패:", error);
                    }
                  },
                });
              }}
              danger
            >
              삭제
            </Button>
            <Button
              type="link"
              size="small"
              icon={<TrophyOutlined />}
              onClick={() =>
                router.push(
                  `/jeju-competition/result/add/${competition.competitionId}`,
                )
              }
            >
              대회결과 등록
            </Button>
            <Button
              type="link"
              size="small"
              icon={<TeamOutlined />}
              onClick={() =>
                router.push(
                  `/admin/competition/participants/${competition.competitionId}`,
                )
              }
            >
              참가팀 관리
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;
