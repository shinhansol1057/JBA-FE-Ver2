const Footer = () => {
  return (
    <div
      className={
        "w-full text-[#8E8E8E] text-xs md:text-base mt-12 md:mt-24 flex flex-col items-center mb-4 md:mb-8"
      }
    >
      <h1 className={"text-sm md:text-lg mb-0.5 md:mb-1"}>
        제주특별자치도농구협회
      </h1>
      <h2 className={"text-xs md:text-base mb-2.5 md:mb-4"}>
        JEJU BASKETBALL ASSOCIATION
      </h2>
      <p className={"mb-2 md:mb-4"}>
        제주특별자치도 제주시 서광로2길 24 제주특별자치도 체육회관 내
      </p>
      <p className={"mb-0.5 md:mb-1"}>Email : baskodh1@korea.kr</p>
      <p> TEL : 064-724-2727 &nbsp;&nbsp; FAX : 064-724-2723</p>
    </div>
  );
};

export default Footer;
