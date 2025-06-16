import React, { useEffect, useState } from "react";
import "./tabs.css";

export interface TabProps {
  id: string;
  label?: string;
  tip?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  active?: boolean;
  children?: React.ReactNode;
}

export interface TabsProps {
  label?: string;
  size?: "tiny" | "sm" | "md" | "lg";
  skin?:
    | "dark"
    | "primary"
    | "danger"
    | "muted"
    | "warning"
    | "success";
  variant?: "bordered" | "boxed" | "boxed-text" | "normal";
  stretch?: boolean;
  stretchMode?: "all" | "normal"
  children: React.ReactElement<TabProps>
  | React.ReactElement<TabProps>[];
  onChange?: (activeTab: TabProps) => void;
}

export const Tab: React.FC<TabProps> = ({}: TabProps) =>
  null;

export const Tabs = ({
  size = "md",
  skin = "primary",
  variant = "normal",
  stretch = false,
  stretchMode = "normal",
  label,
  onChange,
  children,
}: TabsProps) => {
  const [tabs, setTabs] = useState<TabProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const changeTab = (index: number) => {
    setActiveIndex(index)
    onChange && setTimeout(() => onChange(tabs[activeIndex]));
  }
  
  useEffect(() => {
    setTimeout(() => {
      const tabs: TabProps[] = []
      let activeIndex = -1
      React.Children.forEach(children, (child) => {
        if(child.props.id) {
          let active = false;
          if(child.props.active && activeIndex == -1) {
            activeIndex = tabs.length
            active = true;
          }
          tabs.push({...child.props, active}) 
        }
      });
      setTabs(tabs)
      setActiveIndex(activeIndex < 0 ? 0 : activeIndex)
    });
  }, []);


  return (
    <div className={`ff-tabs ff-tabs-${skin} ff-tabs-${variant} ff-tabs-${size}${
        stretch ? ` ff-tabs-stretch-${stretchMode}` : ""
      }`}
    >
      <div>
        <div role="tablist" aria-label={label}>
          {tabs.map((tab, index) => (
            <div key={tab.id} data-disabled={tab.disabled}>
              <a
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={tab.id}
                id={`ff-tab-${tab.id}`}
                tabIndex={tab.active ? 0 : -1}
                onClick={() => changeTab(index)}
                data-tooltip={tab.tip}
                data-placement={tab.tip && "bottom"}>
                {tab.iconPosition !== "right" && tab.icon}
                {tab.label && <span>{tab.label}</span>}
                {tab.iconPosition === "right" && tab.icon}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div>
        {tabs.map((tab, index) => (
           <div key={tab.id}
                 id={tab.id}
                 role="tabpanel"
                 aria-labelledby={`ff-tab-${tab.id}`}
                 aria-label={label}
                 aria-selected={index === activeIndex}
                 tabIndex={0}
                 hidden={index !== activeIndex}
               >
                {tab.children}
            </div>
          ))}
      </div>
    </div>
  );
};