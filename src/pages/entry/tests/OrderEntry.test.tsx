import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { render } from "@testing-library/react";
import Options from "../Options";

test.skip("handles server error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<Options optionType="scoops" />);

  // const alerts = await screen.findAllByRole("alert");
});
