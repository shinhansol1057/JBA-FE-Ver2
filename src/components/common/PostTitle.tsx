const PostTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={
        "h-10 sm:h-12 md:h-14 " +
        "text-sm sm:text-base md:text-xl " +
        "flex justify-center items-center shadow-xl rounded-lg border border-solid border-borderColor bg-white"
      }
    >
      <h1>{title}</h1>
    </div>
  );
};

export default PostTitle;
