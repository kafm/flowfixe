import { type Locale } from "@flowfixe/common";

export default {
  lang: "pt",
  entries: {
    fields:{ 
        attachment: {
            uploadHint: "Clique ou arraste nesta área para fazer upload",
            uploading: "Carregando...",
            removing: "Removendo...",
            maxFileSizeError: "O tamanho do arquivo deve ser menor que %{maxSize}MB.",
          },
          select: {
            defaultPlaceholder: "Escolha uma opção",
          },
    },
    form: {
      expandSection: "Clique para expandir esta seção",
    },
  },
} as Locale;
