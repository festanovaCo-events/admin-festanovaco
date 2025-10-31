import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <div>{t("common.hello")}</div>
    </div>
  );
}
