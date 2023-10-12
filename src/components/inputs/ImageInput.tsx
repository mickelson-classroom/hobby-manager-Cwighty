import React from "react";

export const ImageInput = ({
  base64,
  setBase64,
}: {
  base64: string | null;
  setBase64: (_base64: string | null) => void;
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64(reader.result?.toString().split(",")[1] || null);
      };
    } else {
      setBase64(null);
    }
  };

  return (
    <div>
      {base64 && (
        <img
          src={`data:image/jpeg;base64,${base64}`}
          alt="Preview"
          className="mx-auto d-block img-thumbnail"
        />
      )}
      <div>
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/jpeg, image/png"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
