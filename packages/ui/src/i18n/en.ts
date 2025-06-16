import { type Locale } from "@flowfixe/common";

export default {
  lang: "en",
  entries: {
    fields:{ 
        attachment: {
            uploadHint: "Click or drag file to this area to upload",
            uploading: "Uploading...",
            removing: "Removing...",
            maxFileSizeError: "File size should be less than %{maxSize}MB.",
          },
          select: {
            defaultPlaceholder: "Select an option",
          },
    },
    form: {
      expandSection: "Click to expand this section",
    },
  },
} as Locale;
