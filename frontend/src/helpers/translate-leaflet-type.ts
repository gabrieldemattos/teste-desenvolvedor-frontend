export const translateLeafletType = (type: "patient" | "professional") => {
  switch (type) {
    case "patient":
      return "PACIENTE";
    case "professional":
      return "PROFISSIONAL";
  }
};
