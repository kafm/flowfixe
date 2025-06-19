import "./alert.css";
import React from "react";
import { 
    CheckCircle, 
    ExclamationTriangle,
    InfoCircle, 
    QuestionCircle, 
    ExclamationCircle
} from "../icons";

export interface AlertProps  {
    title: string;
    type?: "success" | "info" | "warning" | "danger" | "muted";
    variant?: "outline" | "text" | "normal";
    icon?: React.ReactNode;
    enableIcon?: boolean,
    children?: React.ReactNode
}

const getIcon = (type: string): React.ReactNode =>  {
    switch(type) {
        case "success":
            return <CheckCircle />;
        case "info": 
            return  <InfoCircle />;
        case "warning": 
            return <ExclamationTriangle />;
        case "danger":
            return <ExclamationCircle />;
        default:
            return <QuestionCircle />;
    }

}

export const Alert = ({
  title,
  type = "muted",
  variant = "normal",
  icon,
  enableIcon = true,
  children
}: AlertProps) => {  
  return (
    <div className={`ff-alert ff-${variant} ff-${type}`}>
        <div className="ff-alert-header">
            {enableIcon && (icon || getIcon(type))}
            <span className="ff-alert-title">{title}</span>
        </div>
        {children && <div className="ff-alert-body">{children}</div>}
    </div>
  );
};