import "./dropdown.css";
import { defaultTo } from "@flowfixe/common";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  type AlignedPlacement,
  autoUpdate,
  computePosition,
} from "@floating-ui/dom";

export interface DropdownProps {
  placement?: "top" | "bottom" | "right" | "left";
  align?: "start" | "end";
  keyboardControls?: boolean;
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  placement,
  align,
  children,
  keyboardControls = false,
}: DropdownProps) => {
  const ddRef = useRef<HTMLDivElement>(null);
  const ddMenuRef = useRef<HTMLDivElement>(null);
  const relativePosition = (defaultTo(placement, "bottom") +
    "-" +
    defaultTo(align, "start")) as AlignedPlacement;
  let cleanup: (() => any) | null = null;
  let options: HTMLElement[] = [];
  let currOptionIndex = -1;

  const configureOptions = (menu: HTMLElement) => {
    options = Array.from(
      menu.querySelectorAll(".ff-dropdown-item:not(.disabled)")
    ) as HTMLElement[];
    currOptionIndex = -1;
  };

  const selectOption = (index: number) => {
    if (index >= options.length) {
      currOptionIndex = 0;
    } else if (index < 0) {
      currOptionIndex = options.length - 1;
    } else {
      currOptionIndex = index;
    }
    options[currOptionIndex].focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!keyboardControls) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.key === "Escape") {
      hide();
    } else if (event.key === "ArrowUp") {
      selectOption(currOptionIndex - 1);
    } else if (event.key === "ArrowDown") {
      selectOption(currOptionIndex + 1);
    }
    return false;
  };

  const placeMenu = (trigger: HTMLElement, menu: HTMLElement) => {
    const _cleanup = autoUpdate(trigger, menu, () => {
      computePosition(trigger, menu, {
        strategy: "fixed",
        placement: relativePosition,
        //middleware: [flip()]
      }).then(({ x, y }) => {
        const topMax = document.body.offsetHeight - menu.offsetHeight;
        const leftMax = document.body.offsetWidth - menu.offsetWidth;
        Object.assign(menu.style, {
          left: `${Math.max(Math.min(x, leftMax), 0)}px`,
          top: `${Math.max(Math.min(y + 3, topMax), 0)}px`,
          position: "fixed",
        });
      });
    });
    document.addEventListener("keydown", handleKeyDown);
    cleanup = () => {
      _cleanup();
      document.removeEventListener("keydown", handleKeyDown);
      menu.style.position = "absolute";
    };
  };

  const show = (trigger: HTMLElement, menu: HTMLElement) => {
    placeMenu(trigger, menu);
    ddMenuRef.current?.classList.add("show");
  };

  const hide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    ddMenuRef.current?.classList.remove("show");
    cleanup?.();
    currOptionIndex = -1;
  };

  const toggle = (trigger: HTMLElement, menu: HTMLElement) => {
    ddMenuRef.current?.classList.contains("show")
      ? hide()
      : show(trigger, menu);
  };

  const init = (
    ddElement: HTMLDivElement,
    ddMenuElement: HTMLDivElement
  ): (() => any) => {
    const trigger = ddElement.querySelector(
      ".ff-dropdown-trigger"
    ) as HTMLElement;
    const menu = ddMenuElement.querySelector(
      ".ff-dropdown-menu"
    ) as HTMLElement;
    const handleTriggerClick = () => toggle(trigger, menu);
    const handleMenuClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("disabled")) {
        setTimeout(hide);
      }
    };
    trigger?.addEventListener("click", handleTriggerClick);
    menu?.addEventListener("click", handleMenuClick);
    keyboardControls && configureOptions(menu);
    return () => {
      trigger?.removeEventListener("click", handleTriggerClick);
      menu?.removeEventListener("click", handleMenuClick);
    };
  };

  useEffect(() => {
    const initCleanup =
      ddRef.current &&
      ddMenuRef.current &&
      init(ddRef.current, ddMenuRef.current);
    return () => {
      hide();
      initCleanup?.();
    };
  }, []);

  return (
    <div ref={ddRef} className="ff-dropdown-placeholder" role="list">
      {React.Children.map(children, (child) => {
        const displayName = (child as any).type?.displayName;
        if (displayName === "DropdownMenu") {
          return createPortal(
            <div ref={ddMenuRef} className="ff-dropdown">
              {child}
              <div
                className="ff-dropdown-overlay"
                onClick={(e) => hide(e)}
              ></div>
            </div>,
            document.body
          );
        }
        return child;
      })}
    </div>
  );
};