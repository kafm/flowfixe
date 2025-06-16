import { Autocomplete as _Autocomplete, type AutocompleteProps, type AutocompleteChangeState } from "./Autocomplete";
import { AutocompleteAction, type AutocompleteActionProps } from "./AutocompleteAction";
import { AutocompleteOption, type AutocompleteOptionProps } from "./AutocompleteOption";

type AutocompleteCollection = typeof _Autocomplete & {
    Action: typeof AutocompleteAction;
    Option: typeof AutocompleteOption
  };
  
const Autocomplete = _Autocomplete as AutocompleteCollection;  
Autocomplete.Action = AutocompleteAction;
Autocomplete.Option = AutocompleteOption;

export {
    type AutocompleteProps,
    type AutocompleteChangeState,
    type AutocompleteActionProps,
    type AutocompleteOptionProps
  };
  
export default Autocomplete;