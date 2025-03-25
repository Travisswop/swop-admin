"use client";

import { Editor } from "@tinymce/tinymce-react";

interface JobsForm {
  description: string;
  [key: string]: string | number | boolean | undefined; // Allows other keys if necessary
}

interface TextEditorProps {
  setJobsForm: React.Dispatch<React.SetStateAction<JobsForm>>;
  jobsForm: JobsForm;
}

const TextEditor: React.FC<TextEditorProps> = ({ setJobsForm, jobsForm }) => {
  const handleEditorChange = (content: string) => {
    setJobsForm((prev) => ({
      ...prev,
      description: content, // Update the description field
    }));
  };

  return (
    <div className="w-full">
      <Editor
        apiKey="njethe5lk1z21je67jjdi9v3wimfducwhl6jnnuip46yxwxh" // Replace with your TinyMCE API key
        value={jobsForm?.description}
        onEditorChange={handleEditorChange}
        init={{
          height: 400,
          menubar: false, // Disable the menu bar for a cleaner UI
          plugins: [
            "autolink",
            "lists",
            "link",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "table",
            "help",
          ],
          toolbar:
            "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link code",
          content_style:
            "body { font-family: Arial, sans-serif; font-size: 14px }", // Apply consistent styles
        }}
      />
    </div>
  );
};

export default TextEditor;
