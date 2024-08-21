const PageTitle = ({ title }: { title: string }) => {
  return (
    <p
      className={
        "text-[14px] sm:text-[18px] md:text-[24px] font-bold mt-[20px] md:mt-[30px]"
      }
    >
      {title}
    </p>
  );
};

export default PageTitle;
