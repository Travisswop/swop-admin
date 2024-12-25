import React from "react";

const TextEditor = () => {
  return (
    <div>
      <Editor
        apiKey="njethe5lk1z21je67jjdi9v3wimfducwhl6jnnuip46yxwxh"
        value={value} // Bind the state to the editor
        onEditorChange={(content) => setValue(content)} // Update state on change
        init={{
          height: 300,
          plugins: [
            "autolink",
            "lists",
            "link",
            // "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            // "media",
            "table",
            "help",
          ],
          toolbar:
            "undo redo | bold italic underline | link image | alignleft aligncenter alignright alignjustify | bullist numlist | code",
        }}
      />
      ;
    </div>
  );
};

export default TextEditor;
