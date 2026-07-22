// WHY WRONG: Single 200-line component with `any` types, inline styles,
// no composition, no memoization. Untestable and unmaintainable.

export function UserCard(props: any) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e3f2fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#1565c0", fontWeight: 600 }}>{props.name[0]}</span>
        </div>
        <div>
          <p style={{ fontWeight: 500 }}>{props.name}</p>
          <p style={{ fontSize: "14px", color: "#666" }}>{props.email}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          padding: "2px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: 500,
          backgroundColor: props.role === "admin" ? "#ffebee" : props.role === "member" ? "#e3f2fd" : "#f5f5f5",
          color: props.role === "admin" ? "#c62828" : props.role === "member" ? "#1565c0" : "#424242",
        }}>
          {props.role}
        </span>
        <button onClick={() => {
          if (isConfirming) {
            props.onRemove(props.email);
            setIsConfirming(false);
          } else {
            setIsConfirming(true);
          }
        }} style={{ fontSize: "14px", color: "#c62828", background: "none", border: "none", cursor: "pointer" }}>
          {isConfirming ? "Confirm?" : "Remove"}
        </button>
      </div>
    </div>
  );
}
