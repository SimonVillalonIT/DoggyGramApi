export const errorTokens = (message: string) => {
  switch (message) {
    case "jwt malformed":
      return "Formato no válido";
    case "invalid token":
    case "jwt expired":
    case "invalid signature":
      return "Token no válido";
    default:
      return message;
  }
};
