// WHY: Small, typed, composable components are testable, reusable,
// and easy to reason about. Hooks keep state logic separated from rendering.

import { useState, useCallback } from "react";

interface UserCardProps {
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  onRemove: (email: string) => void;
}

function RoleBadge({ role }: { role: UserCardProps["role"] }) {
  const colors: Record<UserCardProps["role"], string> = {
    admin: "bg-red-100 text-red-800",
    member: "bg-blue-100 text-blue-800",
    viewer: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[role]}`}>
      {role}
    </span>
  );
}

export function UserCard({ name, email, role, onRemove }: UserCardProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleRemove = useCallback(() => {
    if (isConfirming) {
      onRemove(email);
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
    }
  }, [isConfirming, email, onRemove]);

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary font-semibold">{name[0]}</span>
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <RoleBadge role={role} />
        <button onClick={handleRemove} className="text-sm text-destructive hover:underline">
          {isConfirming ? "Confirm?" : "Remove"}
        </button>
      </div>
    </div>
  );
}
