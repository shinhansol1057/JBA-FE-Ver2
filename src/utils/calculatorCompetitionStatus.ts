const calculatorCompetitionStatus = (
  startDate: Date,
  endDate: Date,
): string => {
  let status: string;
  const now: Date = new Date();
  if (new Date(startDate) > now) {
    status = "예정";
  } else if (
    new Date(startDate) <= now &&
    new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)) >= now
  ) {
    status = "진행중";
  } else {
    status = "종료";
  }

  return status;
};

const calculatorParticipationDuration = (
  startDate: Date | null,
  endDate: Date | null,
) => {
  if (!startDate || !endDate) {
    return false;
  }
  const now: Date = new Date();
  return (
    new Date(startDate) <= now &&
    new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)) >= now
  );
};

export { calculatorCompetitionStatus, calculatorParticipationDuration };
