const SubTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={
        "flex justify-center items-center rounded-lg bg-black shadow-xl " +
        "h-10 sm:h-12 md:h-14"
      }
    >
      <p className={"text-sm sm:text-base md:text-lg text-white font-bold"}>
        {title}
      </p>
    </div>
  );
};

export default SubTitle;
