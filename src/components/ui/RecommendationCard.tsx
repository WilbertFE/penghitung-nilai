/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "./card";

export default function RecommendationCard({ title, score }: any) {
  return (
    <Card>
      <CardContent className="p-4 space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{score}</p>
      </CardContent>
    </Card>
  );
}
