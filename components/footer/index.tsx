import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Sections } from "@/components/ui/sections";

interface FooterProps {
  policies: Array<{ handle: string; title: string }>;
}

export function Footer({ policies }: FooterProps) {
  return (
    <footer>
      <Container className="pt-20 pb-10">
        <Sections className="gap-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">
              {policies.map((policy) => (
                <Link
                  key={policy.handle}
                  href={`/policies/${policy.handle}`}
                  className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {policy.title}
                </Link>
              ))}
            </div>
          </div>
        </Sections>
      </Container>
    </footer>
  );
}
