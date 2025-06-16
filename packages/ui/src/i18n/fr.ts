import { type Locale } from "@flowfixe/common";

export default {
  lang: "fr",
  entries: {
    fields: {
      attachment: {
        uploadHint:
          "Cliquez ou faites glisser le fichier vers cette zone pour le télécharger",
        uploading: "Téléchargement...",
        removing: "Suppression...",
        maxFileSizeError:
          "La taille du fichier doit être inférieure à %{maxSize}MB.",
      },
      select: {
        defaultPlaceholder: "Choisir l'option",
      },
    },
    form: {
      expandSection: "Cliquez pour agrandir cette section",
    },
  },
} as Locale;
