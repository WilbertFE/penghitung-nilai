/* eslint-disable @typescript-eslint/no-explicit-any */

export default function InputField({ label, placeholder }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full rounded-md border px-3 py-2 text-sm"
      />
    </div>
  );
}
