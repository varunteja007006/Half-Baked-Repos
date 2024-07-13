// src/button.tsx
export default function Button() {
  return (
    <button
      style={{
        padding: "1rem",
        text: "black",
        backgroundColor: "yellow",
        fontSize: "1.4rem",
        fontWeight: 600,
        cursor: "pointer", // Added: Set cursor to "pointer" on hover for better UX
        transition: "background-color 0.2s ease-in-out", // Added: Smooth background color transition
        "&:hover": {
          backgroundColor: "#fff",
        },
      }}
    >
      Provider button
    </button>
  );
}
