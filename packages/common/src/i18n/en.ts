import { Locale } from "./translator";

export default {
    lang: "en",
    entries: {
        required: "%{name} is required.",
        minlength: "Length of %{name} is less than the minimum allowed of %{min}.",
        maxlength: "Length of %{name} is greater than the maximum allowed of %{max}.",
        minvalue: "Value of %{name} is less than the minimum value allowed %{min}.",
        maxvalue: "Value of %{name} is greater than the maximum value allowed %{max}.",
        mindate: "%{name} is less than the minimum date allowed %{min}.",
        maxdate: "%{name} is greater than the maximum date allowed %{max}.",
        regex: "Value of %{name} with different format than expected.",
        email: "%{name} is not a valid email."
    }
} as Locale;