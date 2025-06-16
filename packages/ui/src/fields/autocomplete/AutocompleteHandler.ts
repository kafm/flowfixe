import React from "react";
import { inRange, isEmpty } from "@flowfixe/common";
import { type AutocompleteOptionProps } from "./AutocompleteOption";
import AutocompleteFilter from "./AutocompleteFilter";
import {
  type FilterCallback,
  type ErrorCallback,
  type AsyncFilter,
} from "./AutocompleteHelper";

export default class AutocompleteHandler {
  filter: AutocompleteFilter;
  optionIndex: number = -1;
  options: AutocompleteOptionProps[] = [];
  selected: AutocompleteOptionProps | null = null;
  asyncFilter?: AsyncFilter;
  resetHandler?: () => void;
  blurHandler?: () => void;
  focusHandler?: () => void;
  filterHandler?: FilterCallback;
  fetchHandler?: (fetching: boolean) => void;
  selectHandler?: (
    selected: AutocompleteOptionProps | null,
    fromReset?: boolean
  ) => void;
  cancelHandler?: () => void;

  constructor({
    debounceTimeout,
    options,
    onFilter,
  }: {
    debounceTimeout: number;
    options?: AutocompleteOptionProps[];
    onFilter?: AsyncFilter;
  }) {
    this.options = options || [];
    this.filter = new AutocompleteFilter(onFilter)
      .setDebouncerTimeout(debounceTimeout)
      .setOptions(options || [])
      .onLoadingStart(() => {
        this.fetchHandler?.(true)
      })
      .onLoadingEnd(() => {
        this.fetchHandler?.(false)
      })
      .onFilter((options) => {
        this.options = options;
        this.filterHandler?.(options);
      });
  }

  handleKeypress({ key, target }: React.KeyboardEvent) {
    const el = target as HTMLInputElement;
    switch (key) {
      case "ArrowUp":
        this.decrementOptionIndex();
        break;
      case "ArrowDown":
        this.incrementOptionIndex();
        break;
      case "Enter":
        this.selectOptionIndex();
        break;
      case "Escape":
        this.handleCancel(el);
        break;
      default:
        this.handleFilter(el.value);
    }
  }

  incrementOptionIndex() {
    if(isEmpty(this.options)) return;
    const options = [...this.options]
    const index = this.optionIndex + 1;
    this.optionIndex = index >= options.length ? 0 : index;
    options[this.optionIndex] = {...options[this.optionIndex], highlighted: true}
    this.filterHandler?.(options)
  }

  decrementOptionIndex() {
    if(isEmpty(this.options)) return;
    const options = [...this.options]
    const index = this.optionIndex - 1;
    this.optionIndex = index < 0 ? options.length-1 : index;
    options[this.optionIndex] = {...options[this.optionIndex], highlighted: true}
    this.filterHandler?.(options);
  }

  handleReset() {
    this.handleFilter("");
    this.setSelected(null, true);
    this.resetHandler?.();
  }

  handleFocus() {
    this.handleFilter("");
    setTimeout(() => this.focusHandler?.())
  }

  handleFilter(keywords: string) {
    this.optionIndex = -1;
    this.filter.doFilter(keywords);
  }

  handleCancel(el: HTMLInputElement) {
    this.cancelHandler?.();
    el.blur();
  }

  handleBlur() {
    this.blurHandler?.();
    this.asyncFilter && this.handleFilter("");
  }

  onBlur(handler: () => void): AutocompleteHandler {
    this.blurHandler = handler;
    return this;
  }

  onFocus(handler: () => void): AutocompleteHandler {
    this.focusHandler = handler;
    return this;
  }

  onReset(handler: () => void): AutocompleteHandler {
    this.resetHandler = handler;
    return this;
  }

  onCancel(handler: () => void): AutocompleteHandler {
    this.cancelHandler = handler;
    return this;
  }

  setSelected(
    option: AutocompleteOptionProps | null,
    fromReset: boolean = false
  ): AutocompleteHandler {
    this.selected = option;
    this.selectHandler?.(option, fromReset);
    return this;
  }

  selectOptionIndex() {
    this.setSelected(
      inRange(this.optionIndex, 0, this.options.length)
        ? this.options[this.optionIndex]
        : null
    );
  }

  setSelectedFromValue(value: string | null | undefined): AutocompleteHandler {
    let selected = null;
    if (value) {
      selected =
        this.options?.find((option) => option.value == value) ||
        (() =>
          value ? ({ value: value } as AutocompleteOptionProps) : null)();
    }
    this.setSelected(selected);
    return this;
  }

  setOptions(options: AutocompleteOptionProps[]): AutocompleteHandler {
    this.options = options;
    return this;
  }

  onSelect(
    handler: (
      option: AutocompleteOptionProps | null,
      fromReset?: boolean
    ) => void
  ): AutocompleteHandler {
    this.selectHandler = handler;
    return this;
  }

  onFilter(handler: FilterCallback): AutocompleteHandler {
    this.filterHandler = handler;
    return this;
  }

  onError(handler: ErrorCallback | undefined): AutocompleteHandler {
    this.filter.onError(handler);
    return this;
  }

  onFetching(handler: (fetching: boolean) => void): AutocompleteHandler {
    this.fetchHandler = handler;
    return this;
  }

}
