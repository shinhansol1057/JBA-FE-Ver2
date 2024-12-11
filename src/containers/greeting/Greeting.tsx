import Image from "next/image";

const Greeting = () => {
  return (
    <div className={"flex flex-col items-center w-[90%] md:w-[800px] mb-8"}>
      <h2
        className={
          "text-sm sm:text-base md:text-xl text-[#999999] my-5 text-center"
        }
      >
        제주특별자치도농구협회 홈페이지 방문을 진심으로 환영합니다.
      </h2>
      <div
        className={
          "flex flex-col items-center mb-3 text-base sm:text-lg md:text-xl"
        }
      >
        <p className={"max-w-[460px] text-center"}>
          제주특별자치도 농구 발전을 위해 끊임없는 관심과 애정을 보여드릴 수
          있는 협회가 될 것을 약속드립니다.
        </p>
      </div>
      <Image
        src={"/image/회장님 사진1.jpeg"}
        alt={"회장님사진"}
        width={500}
        height={500}
        className={
          "border border-solid border-borderColor w-[280px] md:[400px] "
        }
      />
      <div
        className={
          "flex flex-col items-center mt-3 mb-10 " +
          "text-sm sm:text-base md:text-lg"
        }
      >
        <p>제주특별자치도 농구협회장</p>
        <p className={"font-bold "}>김병주</p>
      </div>
      <div className={"text-sm sm:text-base md:text-lg text-[#4B4B4B]"}>
        <p className={"mb-3"}>안녕하십니까, 제주특별자치도 농구협회장입니다.</p>
        <p className={"mb-3"}>
          저희 협회는 제주도 내 모든 연령층의 사람들이 농구를 접하고 즐길 수
          있도록 최선을 다하고 있습니다. 농구는 단순한 스포츠를 넘어, 건강한
          신체와 정신을 기르고, 협동심과 스포츠맨십을 배양하는 중요한 도구라고
          생각합니다. 이를 위해 우리는 지속적인 훈련 프로그램을 제공하며, 다양한
          경기를 통해 제주 지역 사회의 구성원들이 농구를 즐길 수 있는 기회를
          확대해 나가고 있습니다.
        </p>
        <p className={"mb-3"}>
          제주의 아름다운 자연과 함께, 저희 농구협회는 지역 사회에 활력을
          불어넣고자 합니다. 농구를 통해 사람들 간의 소통과 교류를 증진시키고,
          더 나아가 체육 문화의 발전에도 기여하고자 합니다. 농구는 몸과 마음을
          건강하게 유지할 뿐만 아니라, 사회적 관계를 형성하는 데 중요한 역할을
          합니다. 저희는 이러한 농구의 매력을 널리 알리고, 더 많은 사람들이
          농구를 통해 즐거움을 느낄 수 있도록 노력할 것입니다.
        </p>
        <p className={"mb-3"}>
          특히, 제주 지역의 특수성을 반영한 맞춤형 프로그램을 개발하여, 더 많은
          사람들이 농구의 재미와 이점을 체험할 수 있도록 하겠습니다. 또한,
          다양한 연령층이 함께 어울리며 즐길 수 있는 농구 문화를 조성하여,
          제주의 농구가 더욱 활성화될 수 있도록 지원하겠습니다.
        </p>
        <p className={"mb-3"}>
          앞으로도 저희 제주특별자치도 농구협회는 농구를 사랑하는 모든 분들과
          함께 지역 사회에 긍정적인 영향을 미치며, 체육 문화의 발전을 위해
          최선을 다할 것입니다. 여러분의 많은 관심과 성원을 부탁드립니다.
        </p>
        <p className={"mb-3"}>감사합니다.</p>
      </div>
    </div>
  );
};

export default Greeting;
