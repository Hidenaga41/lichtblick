// SPDX-FileCopyrightText: Copyright (C) 2023-2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import { AppType, launchApp } from "./launchApp";
import { loadFile } from "./utils/loadFile";

describe("mapPanel", () => {
  const closeDataSourceDialogAfterAppLaunch = async (app: AppType) => {
    await expect(app.renderer.getByTestId("DataSourceDialog").isVisible()).resolves.toBe(true);
    await app.renderer.getByTestId("DataSourceDialog").getByTestId("CloseIcon").click();
    await expect(app.renderer.getByTestId("DataSourceDialog").isVisible()).resolves.toBe(false);
  };

  it("should open map panel when loading a file", async () => {
    await using app = await launchApp();
    await closeDataSourceDialogAfterAppLaunch(app);

    await loadFile(app, "../../../packages/suite-base/src/test/fixtures/example.bag");

    //Click on add panel and select Map
    await app.renderer.getByTestId("AddPanelButton").click();

    // Click on "Search panels" input field and type Map
    const searchInput = app.renderer.getByPlaceholder("Search panels");
    //   await searchInput.click();
    await searchInput.pressSequentially("Map");
    await app.renderer.getByTestId("panel-menu-item Map").click();

    const mapSettingsIcon = app.renderer.getByTestId("SettingsIcon").nth(0);
    await mapSettingsIcon.click();

    await expect(app.renderer.getByText("Map panel", { exact: true }).innerText()).resolves.toBe(
      "Map panel",
    );
  }, 15_000);
});
