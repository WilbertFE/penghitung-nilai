// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PageWrapper({ title, description, children }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
