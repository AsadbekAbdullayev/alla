export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// utils/fileValidation.ts
export const validateFileFormat = (
  file: File,
  allowedTypes: string[]
): { isValid: boolean; error?: string } => {
  const fileType = file.type;
  const fileExtension = file.name.split(".").pop()?.toLowerCase();

  // PDF tekshirish
  if (allowedTypes.includes("pdf")) {
    if (fileType === "application/pdf" || fileExtension === "pdf") {
      return { isValid: true };
    }
  }

  // Audio tekshirish
  if (allowedTypes.includes("audio")) {
    if (
      fileType.startsWith("audio/") ||
      ["mp3", "wav", "ogg", "m4a"].includes(fileExtension || "")
    ) {
      return { isValid: true };
    }
  }

  // Image tekshirish
  if (allowedTypes.includes("image")) {
    if (
      fileType.startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension || "")
    ) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    error: `Fayl formati noto'g'ri. Ruxsat etilgan formatlar: ${allowedTypes.join(
      ", "
    )}`,
  };
};
