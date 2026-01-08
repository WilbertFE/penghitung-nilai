import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "@/components/ui/InputField";
import PageWrapper from "@/components/ui/PageWrapper";

export default function PengaturanPage() {
  return (
    <PageWrapper title="Pengaturan" description="Kelola akun dan preferensi">
      <Card>
        <CardContent className="space-y-4 p-6">
          <InputField label="Nama Lengkap" placeholder="Wilbert Bernardi" />
          <InputField label="Kelas" placeholder="XII IPA" />
          <Button variant="outline">Simpan Perubahan</Button>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
