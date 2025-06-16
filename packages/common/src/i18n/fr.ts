import { Locale } from "./translator";

export default {
    lang: "fr", 
    entries: {
        required: "%{name} est requis.",
        minlength: "La longueur de %{name} est inférieure au minimum autorisé de %{min}.",
        maxlength: "La longueur de %{name} est supérieure au maximum autorisé de %{max}.",
        minvalue: "La valeur de %{name} est inférieure à la valeur minimale autorisée %{min}.",
        maxvalue: "La valeur de %{name} est supérieure à la valeur maximale autorisée %{max}.",
        mindate: "%{name} est inférieur à la date minimale autorisée %{min}.",
        maxdate: "%{name} est supérieur à la date maximale autorisée %{max}.",
        regex: "Value of %{name} with different format than expected.",
        email: "%{name} n'est pas un e-mail valide."
    }
} as Locale;