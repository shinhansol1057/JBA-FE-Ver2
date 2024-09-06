const SubTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={
        "flex justify-center items-center rounded-[8px] bg-black shadow-xl " +
        "w-[280px] sm:w-[400px] md:w-[800px] " +
        "h-[30px] sm:h-[40px] md:h-[50px]"
      }
    >
      <p
        className={
          "text-[12px] sm:text-[14px] md:text-[18px] text-white font-bold"
        }
      >
        {title}
      </p>
    </div>
  );
};

export default SubTitle;
