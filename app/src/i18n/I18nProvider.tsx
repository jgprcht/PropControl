"use client";

import { IntlProvider } from "react-intl";
import { ReactNode } from "react";
import messagesDe from "@/i18n/de.json";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  return (
    <IntlProvider locale="de-DE" messages={messagesDe} defaultLocale="de-DE">
      {children}
    </IntlProvider>
  );
}
