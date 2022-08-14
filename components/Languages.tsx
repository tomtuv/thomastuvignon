import { useRouter } from "next/router";
import Link from "next/link";
import { useCookies } from "react-cookie";

const LANGUAGE_NAMES: Record<string, string> = {
  fr: "Français",
  en: "English",
};

export default function Languages() {
  const { asPath, locale: activeLocale = "fr", locales = [] } = useRouter();
  const [cookie, setCookie] = useCookies(["NEXT_LOCALE"]);

  return (
    <ul>
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            href={asPath}
            hrefLang={locale}
            locale={locale}
            data-link=""
            aria-current={locale === activeLocale ? "page" : undefined}
            onClick={() => {
              if (cookie.NEXT_LOCALE !== locale) {
                setCookie("NEXT_LOCALE", locale, { path: "/" });
              }
            }}
          >
            {LANGUAGE_NAMES[locale]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
