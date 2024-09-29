const Footer = () => {
  return (
    <div
      className={
        "w-full text-[#8E8E8E] text-[9px] sm:text-[11px] md:text-[14px] mt-[50px] sm:mt-[70px] md:mt-[100px] flex flex-col items-center"
      }
    >
      <h1
        className={
          "text-[10px] sm:text-[13px] md:text-[18px] mb-[2px] sm:mb-[3px] md:mb-[4px]"
        }
      >
        제주특별자치도농구협회
      </h1>
      <h2
        className={
          "text-[7px] sm:text-[10px] md:text-[13px] mb-[10px] sm:mb-[12px] md:mb-[16px]"
        }
      >
        JEJU BASKETBALL ASSOCIATION
      </h2>
      <p className={"mb-[10px] sm:mb-[12px] md:mb-[16px]"}>
        제주특별자치도 제주시 서광로2길 24 제주특별자치도 체육회관 내
      </p>
      <p className={"mb-[2px] sm:mb-[3px] md:mb-[4px]"}>
        Email : baskodh1@korea.kr
      </p>
      <p> TEL : 064-724-2727 &nbsp;&nbsp; FAX : 064-724-2723</p>
    </div>
  );
};

export default Footer;
