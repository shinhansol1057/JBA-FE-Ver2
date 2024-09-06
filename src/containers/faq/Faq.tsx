import { FAQMockData, MockPost } from "@/constants/FAQData";
import FaqCard from "@/containers/faq/FaqCard";

const Faq = () => {
  return (
    <div className={"w-[280px] sm:w-[400px] md:w-[600px] mt-[20px]"}>
      {FAQMockData.posts.map((item: MockPost) => {
        return <FaqCard data={item} key={item.postId} />;
      })}
    </div>
  );
};

export default Faq;
