import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Prose } from "@/components/ui/prose";

export default function PrivacyPage() {
  return (
    <Page>
      <Container>
        <Prose>
          <h1>Privacy Policy</h1>
          <p>
            This is a local storefront demo. Your sample cart stays in this browser's local storage.
            No orders or payments are submitted, and the demo has no analytics or customer accounts.
          </p>
        </Prose>
      </Container>
    </Page>
  );
}
