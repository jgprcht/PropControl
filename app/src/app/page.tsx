"use client";

import { FormattedMessage } from "react-intl";
import { moduleRegistry } from "@/core/moduleRegistry";

export default function HomePage() {
  const visibleModules = moduleRegistry.filter((m) => m.id !== "core");

  return (
    <main className="page">
      <header className="header">
        <h1>
          <FormattedMessage id="app.title" defaultMessage="PropControl" />
        </h1>
        <p>
          <FormattedMessage
            id="app.subtitle"
            defaultMessage="Self-hosted property management and financial control"
          />
        </p>
      </header>
      <nav className="nav">
        <ul>
          <li>
            <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard" />
          </li>
          <li>
            <FormattedMessage id="nav.properties" defaultMessage="Properties" />
          </li>
          <li>
            <FormattedMessage id="nav.reporting" defaultMessage="Reporting" />
          </li>
          <li>
            <FormattedMessage id="nav.tax" defaultMessage="Tax" />
          </li>
        </ul>
      </nav>
      <section className="status">
        <FormattedMessage
          id="layout.health.ok"
          defaultMessage="System status: OK"
        />
      </section>
      <section className="modules">
        <h2>
          <FormattedMessage
            id="modules.heading"
            defaultMessage="Modules"
          />
        </h2>
        <ul>
          {visibleModules.map((mod) => (
            <li key={mod.id} className={mod.enabled ? "mod-enabled" : "mod-disabled"}>
              <span className="mod-name">{mod.displayName}</span>
              <span className="mod-status">
                {mod.enabled ? (
                  <FormattedMessage
                    id="modules.status.enabled"
                    defaultMessage="enabled"
                  />
                ) : (
                  <FormattedMessage
                    id="modules.status.disabled"
                    defaultMessage="disabled"
                  />
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
