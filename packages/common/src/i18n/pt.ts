import { Locale } from "./translator";

export default {
    lang: "pt",
    entries: {
        required: "%{name} é obrigatório.",
        minlength: "O comprimento de %{name} é menor que o mínimo permitido de %{min}.",
        maxlength: "O comprimento de %{name} é maior que o máximo permitido de %{max}.",
        minvalue: "O valor de %{name} é menor que o valor mínimo permitido %{min}.",
        maxvalue: "O valor de %{name} é maior que o valor máximo permitido %{max}.",
        mindate: "%{name} é menor que a data mínima permitida %{min}.",
        maxdate: "%{name} é maior que a data máxima permitida %{max}.",
        regex: "Valor de %{name} com formato diferente do esperado.",
        email: "%{name} não é um email válido."
    }
} as Locale;