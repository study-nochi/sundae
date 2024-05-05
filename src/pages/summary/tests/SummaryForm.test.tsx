import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("초기 환경", () => {
  render(<SummaryForm setOrderPhase={() => {}} />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  // 기본적으로 체크박스가 선택 해제되어 있는지 확인합니다.
  expect(checkbox).not.toBeChecked();

  // 확인 버튼은 기본적으로 비활성화되어 있습니다.
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("체크박스는 첫 번째 클릭 시 버튼을 활성화하고 두 번째 클릭 시 비활성화합니다.", async () => {
  const user = userEvent.setup();

  render(<SummaryForm setOrderPhase={() => {}} />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  // 첫 번째 클릭 시 버튼 활성화
  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // 두 번째 클릭 시 버튼 비활성화
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("마우스를 가져가면 팝오버가 반응합니다.", async () => {
  const user = userEvent.setup();
  render(<SummaryForm setOrderPhase={() => {}} />);

  // 팝오버는 숨겨져 시작됩니다.
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // 체크박스 레이블에 마우스 오버하면 팝업이 나타납니다.
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // 마우스를 떼면 팝업이 사라집니다.
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
