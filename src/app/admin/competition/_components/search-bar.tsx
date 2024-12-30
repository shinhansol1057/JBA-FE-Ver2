"use client";

import React, { useEffect } from "react";
import { Input, Select, DatePicker, Button, Form } from "antd";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { api } from "@/services/axios/authApi";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchBar = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [divisions, setDivisions] = React.useState<
    Array<{ divisionName: string }>
  >([]);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await api.get("/v1/api/division/a-valid");
        setDivisions(response.data.data);
      } catch (error) {
        console.error("부문 목록 조회 실패:", error);
      }
    };
    fetchDivisions();
  }, []);

  const handleSearch = (values: any) => {
    const params = new URLSearchParams();
    params.append("searchType", "title");
    if (values.searchKey) params.append("searchKey", values.searchKey);
    if (values.division !== "전체") params.append("division", values.division);
    if (values.situation !== "전체")
      params.append("situation", values.situation);
    if (values.dateRange) {
      params.append(
        "filterStartDate",
        values.dateRange[0].format("YYYY-MM-DD"),
      );
      params.append("filterEndDate", values.dateRange[1].format("YYYY-MM-DD"));
    }
    params.append("page", "0");
    params.append("size", "20");

    router.push(`/admin/competition?${params.toString()}`);
  };

  const handleReset = () => {
    form.resetFields();
    router.push("/admin/competition");
  };

  const selectStyle = { width: 200 };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <Form
        form={form}
        onFinish={handleSearch}
        initialValues={{
          searchKey: "",
          division: "전체",
          situation: "전체",
          dateRange: null,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 space-y-2">
          <Form.Item name="searchKey" className="mb-0 w-full">
            <Input
              placeholder="대회명을 입력하세요"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="division" className="mb-0">
            <Select style={selectStyle}>
              <Option value="전체">전체 부문</Option>
              {divisions.map((div) => (
                <Option key={div.divisionName} value={div.divisionName}>
                  {div.divisionName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="situation" className="mb-0">
            <Select style={selectStyle}>
              <Option value="전체">전체 상태</Option>
              <Option value="예정">예정</Option>
              <Option value="진행중">진행중</Option>
              <Option value="종료">종료</Option>
            </Select>
          </Form.Item>

          <Form.Item name="dateRange" className="mb-0 w-full">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div className="flex justify-end space-x-2">
          <Button icon={<UndoOutlined />} onClick={handleReset}>
            초기화
          </Button>
          <Button icon={<SearchOutlined />} htmlType="submit">
            조회
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
