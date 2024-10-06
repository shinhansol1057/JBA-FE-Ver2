import { FAQMockData, MockPost } from "@/constants/FAQData";
import FaqCard from "@/containers/faq/FaqCard";

const Faq = () => {
  return (
    <div className={"w-[90%] md:w-[800px] mt-5"}>
      {FAQMockData.posts.map((item: MockPost) => {
        return <FaqCard data={item} key={item.postId} />;
      })}
    </div>
  );
};

export default Faq;
