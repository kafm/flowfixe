import { isNil } from "./validator";

/*
// map :: # M a -> (a -> b) -> M b
// bind(flatMap) :: # M a -> (a -> M b) -> M b
*/

export interface Option<T> {
  isJust(): boolean;
  isNothing(): boolean;
  caseOf<U, V>(noneTransform: () => U, someTransform: (value: T) => V): U | V;
  map<U>(transform: (x: T) => U): Option<U | T>;
  bind<U>(transform: (x: T) => Option<U>): Option<U>;
}

export class Just<T> implements Option<T> {
  constructor(readonly value: T) {}
  static of = <U>(value: U) => new Just<U>(value);
  isJust = () => true;
  isNothing = () => false;
  caseOf = <U, V>(_: () => U, someTransform: (value: T) => V) =>
    someTransform(this.value);
  map = <U>(transform: (x: T) => U) => Just.of(transform(this.value));
  bind = <U>(transform: (x: T) => Option<U>) => transform(this.value);
}

export class Nothing<T> implements Option<T> {
  value = null;
  static get = <U>() => new Nothing<U>();
  isJust = () => false;
  isNothing = () => true;
  caseOf = <U, V>(noneTransform: () => U, _: (value: T) => V) =>
    noneTransform();
  map = <U>(_: (x: T) => U) => this;
  bind = <U>(_: (x: T) => Option<U>) => new Nothing<U>();
}

export interface Either<L, R> {
  isLeft(): boolean;
  isRight(): boolean;
  caseOf<U, V>(
    leftTransform: (value: L) => U,
    rightTransform: (value: R) => V
  ): U | V;
  map<U>(transform: (x: R) => U): Either<L, U>;
  bind<U>(transform: (x: R) => Either<L, U>): Either<L, U>;
}

export class Right<L, R> implements Either<L, R> {
  constructor(readonly value: R) {}
  static of = <U, V>(value: V) => new Right<U, V>(value);
  isLeft = () => false;
  isRight = () => true;
  caseOf = <U, V>(_: (value: L) => U, rightTransform: (value: R) => V) =>
    rightTransform(this.value);
  map = <U>(transform: (x: R) => U) => Right.of<L, U>(transform(this.value));
  bind = <U>(transform: (x: R) => Either<L, U>) => transform(this.value);
}

export class Left<L, R> implements Either<L, R> {
  constructor(readonly value: L) {}
  static of = <U, V>(value: U) => new Left<U, V>(value);
  isLeft = () => true;
  isRight = () => false;
  caseOf = <U, V>(leftTransform: (value: L) => U, _: (value: R) => V) =>
    leftTransform(this.value);
  map = <U>(_: (x: R) => U) => Left.of<L, U>(this.value);
  bind = <U>(_: (x: R) => Either<L, U>) => Left.of<L, U>(this.value);
}

export class Writer<T, W = string> {
  constructor(readonly value: T, readonly monoid: W[] = []) {}
  map = <U>(transform: (x: T) => U) =>
    new Writer<U, W>(transform(this.value), this.monoid);
  bind = <U>(transform: (x: T) => Writer<U, W>) => {
    const other = transform(this.value);
    return new Writer<U, W>(other.value, this.monoid.concat(other.monoid));
  };
  collected = () => this.monoid;
}

export const toOption = <T>(value: T | null | undefined) => isNil(value) || value === "" ? Nothing.get<T>() : Just.of<T>(value!);

export const orElse = <T>(option: Option<T>, alternative: T) => option.isJust() ? option: toOption(alternative)