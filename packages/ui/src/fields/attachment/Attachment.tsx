import "./attachment.css";
import { isEmpty, isNil } from "@flowfixe/common";
import { useState, useRef } from "react";
import { validateField, StringField } from "@flowfixe/common";
import {
  CloudDownload,
  CloudUpload,
  Paperclip,
  Trash,
} from "../../icons";
import { type FieldState, type FieldProps } from "../helpers";
import { translate } from "../../i18n";
import { useFormValue } from "../../form";

export interface AttachmentChangeState
  extends FieldState<FileAttachment | null> {}

export interface FileAttachment {
  name: string;
  url?: string;
}

export type AttachmentCallback<T, R = any> = (file: T) => Promise<R>;

export interface AttachmentProps extends FieldProps<FileAttachment> {
  inline?: boolean;
  required?: boolean;
  uploading?: boolean;
  progress?: number;
  width?: string;
  maxSize?: number;
  onUpload?: AttachmentCallback<File, FileAttachment | void>;
  onDownload?: AttachmentCallback<FileAttachment>;
  onRemove?: AttachmentCallback<FileAttachment>;
}

export const Attachment = ({
  name,
  label,
  aid,
  value,
  width = "100%",
  inline = false,
  readOnly = false,
  required = false,
  uploading = false,
  progress = 0,
  maxSize,
  onUpload,
  onDownload,
  onRemove,
  onChange,
}: AttachmentProps) => {
  const [, setFormValue] = useFormValue(name, value);
  const maximumFileSize = isNil(maxSize) ? null : maxSize! * 1024 * 1024;
  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(uploading);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [dropping, setDropping] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<FileAttachment | null>(
    value || null
  );
  const [errors, setErrors] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    !dropping && setDropping(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dropping && setDropping(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    !isEmpty(files) && handleUpload(files[0]);
  };

  const handleFileSelection = (e: React.ChangeEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files || [];
    !isEmpty(files) && handleUpload(files[0]);
  };

  const triggerUpload = () => !attachment && inputRef.current?.click();

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      if (isNil(maximumFileSize) || file.size < maximumFileSize!) {
        triggerChange(
          (onUpload && (await onUpload(file))) || {
            name: file.name,
          }
        );
      } else {
        setErrors([
          translate("fields.attachment.maxFileSizeError", { maxSize }),
        ]);
      }
    } catch (e) {
      console.error("Could not upload due to error", e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (attachment) {
      onDownload ? onDownload(attachment) : downloadRef.current?.click();
    }
  };

  const handleRemove = async () => {
    if (!attachment) return;
    setIsRemoving(true);
    try {
      onRemove && (await onRemove(attachment));
      triggerChange(null);
    } catch (e) {
      console.error("Could not remove due to error", e);
    } finally {
      setIsRemoving(false);
    }
  };

  const toHandleChange = (newValue: FileAttachment | null): boolean => {
    return !readOnly && (newValue !== attachment || !newValue);
  };

  const triggerChange = (newAttachment: FileAttachment | null) => {
    if (!toHandleChange(newAttachment)) return;
    const validation = validateField<string>(
      StringField.of(name, label).required(required).value(newAttachment)
    );
    const errors = validation.caseOf(
      (errors) => errors,
      () => []
    );
    setFormValue(newAttachment!);
    onChange?.({
      value: newAttachment,
      oldValue: attachment,
      isValid: isEmpty(errors),
      errors,
    });
    setAttachment(newAttachment);
    setErrors(errors);
  };

  return (
    <div
      className={`ff-field-container${readOnly ? " ff-read-only" : ""}${
        inline ? " ff-field-inline" : ""
      }`}
      style={{ width }}
    >
      {!inline && (
        <div className="ff-field-label">
          {label && (
            <label>
              {label} {required && <small className="ff-required">*</small>}
            </label>
          )}
          {aid && (
            <div className="ff-aid">
              <small>{aid || ""}</small>
            </div>
          )}
        </div>
      )}
      <div
        className={`ff-attachment-value${!isEmpty(errors) ? " ff-error" : ""}${
          dropping ? " ff-attachment-drag-hover" : ""
        }`}
        onClick={triggerUpload}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!readOnly && (
          <>
            <input
              ref={inputValue}
              type="text"
              name={name}
              required={required}
              onBlur={() => triggerChange(attachment)}
              tabIndex={-1}
              defaultValue={attachment?.name}
            />
            <input
              type="file"
              name={`${name}-file`}
              ref={inputRef}
              required={required}
              onChange={handleFileSelection}
            />
          </>
        )}
        {attachment && (
          <>
            <a href={attachment.url} target="_blank" />
            <div className="ff-attachment-options">
              {(attachment?.url || onDownload) && (
                <a ref={downloadRef} onClick={handleDownload}>
                  <CloudDownload />
                </a>
              )}
              {!readOnly && (
                <a onClick={handleRemove}>
                  <Trash />
                </a>
              )}
            </div>
          </>
        )}
        <div
          className={`ff-attachment-icon ${
            isUploading || isRemoving ? "ff-resolving" : ""
          }`}
        >
          {attachment ? <Paperclip /> : <CloudUpload />}
        </div>
        <div>
          <span>
            {(() => {
              if (isUploading) return translate("fields.attachment.uploading");
              else if (isRemoving)
                return translate("fields.attachment.removing");
              else {
                return (
                  attachment?.name || translate("fields.attachment.uploadHint")
                );
              }
            })()}
          </span>
          {isUploading && <progress value={progress} max="100"></progress>}
        </div>
      </div>
      {errors.map((error, i) => (
        <small key={`error${i}`} className="ff-error">
          {error}
        </small>
      ))}
    </div>
  );
};
