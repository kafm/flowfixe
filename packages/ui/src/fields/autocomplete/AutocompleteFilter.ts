import { includes, filter, toLower } from "@flowfixe/common";
import { type AutocompleteOptionProps } from "./AutocompleteOption";
import {
  type FilterCallback,
  type ErrorCallback,
  type FilterLoadingCallback,
  type AsyncFilter,
} from "./AutocompleteHelper";

export default class AutocompleteFilter {
  cachedKeywords = new Map<string, AutocompleteOptionProps[]>();
  debouncer: number = -1;
  debouncerTimeout: number = 500;
  fetching: boolean = false;
  options: AutocompleteOptionProps[] = [];
  filterCallback?: FilterCallback;
  errorCallback?: ErrorCallback;
  loadingStartCallback?: FilterLoadingCallback;
  loadingEndCallback?: FilterLoadingCallback;

  constructor(readonly asyncFilter?: AsyncFilter) {}

  doFilter(keywords: string) {
    this.asyncFilter
      ? this.useFilter(this.asyncFilter, keywords)
      : this.filterOptions(keywords);
  }

  filterOptions(keywords: string) {
    this.debounce(() => {
      if (!keywords) {
        this.filterCallback?.([...this.options]);
      } else {
        const key = toLower(keywords);
        let filteredOptions = this.cachedKeywords.get(key);
        if (!filteredOptions) {
          filteredOptions = filter(this.options, (option) =>
            includes(toLower(option.label || option.value), key)
          );
          this.cachedKeywords.set(key, filteredOptions);
        }
        this.filterCallback?.(filteredOptions);
      }
    });
  }

  useFilter(asyncFilter: AsyncFilter, keywords: string) {
    this.debounce(async () => {
      const key = toLower(keywords);
      let results = !key ? [] : this.cachedKeywords.get(key);
      if (results) {
        this.filterCallback?.(results);
        return;
      }
      this.loadingStartCallback?.();
      try {
        const results = (await asyncFilter(keywords)) || [];
        this.cachedKeywords.set(key, results);
        this.filterCallback?.(results);
      } catch (e) {
        this.errorCallback?.(e instanceof Error ? e : Error(e as string));
      } finally {
        this.loadingEndCallback?.();
      }
    });
  }

  debounce(callback: () => void) {
    if (this.debouncer > -1) {
      clearTimeout(this.debouncer);
    }
    this.debouncer = window.setTimeout(() => {
      callback();
      this.debouncer = -1;
    }, this.debouncerTimeout);
  }

  onLoadingStart(callback: FilterLoadingCallback): AutocompleteFilter {
    this.loadingStartCallback = callback;
    return this;
  }

  onLoadingEnd(callback: FilterLoadingCallback): AutocompleteFilter {
    this.loadingEndCallback = callback;
    return this;
  }

  onFilter(callback: FilterCallback): AutocompleteFilter {
    this.filterCallback = callback;
    return this;
  }

  onError(callback?: ErrorCallback): AutocompleteFilter {
    this.errorCallback = callback;
    return this;
  }

  setOptions(options: AutocompleteOptionProps[]): AutocompleteFilter {
    this.options = options;
    return this;
  }

  setDebouncerTimeout(debouncerTimeout: number): AutocompleteFilter {
    this.debouncerTimeout = debouncerTimeout;
    return this;
  }
}
