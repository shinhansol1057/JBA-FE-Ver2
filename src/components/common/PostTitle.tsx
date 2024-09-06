const PostTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={
        "w-[280px] sm:w-[400px] md:w-[800px] " +
        "h-[30px] sm:h-[40px] md:h-[50px] " +
        "text-[10px] sm:text-[12px] md:text-[18px] " +
        "flex justify-center items-center shadow-xl rounded-[8px] border border-solid border-borderColor bg-white"
      }
    >
      <h1>{title}</h1>
    </div>
  );
};

export default PostTitle;
