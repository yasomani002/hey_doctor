import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import { Text } from "@/components/common/Text";

export function BreadcrumbComponent({
  currentPage,
  mainPage,
  mainPageLink,
  showHome = true,
  middlePages = [],
}: {
  currentPage?: string;
  mainPage?: string;
  mainPageLink?: string;
  showHome?: boolean;
  middlePages?: {
    name: string;
    link: string;
    isCurrentPage?: boolean;
  }[];
}) {
  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        {showHome && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link
                  style={{
                    textDecoration: "underline",
                    padding: "6px",
                  }}
                  to="/home"
                >
                  {/* Home */}
                  <House size={22} />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {mainPage && (
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link
                style={{
                  textDecoration: "none",
                  cursor: mainPageLink ? "pointer" : "default",
                }}
                to={mainPageLink || ""}
              >
                <Text fontSize="16px">{mainPage}</Text>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {middlePages.length > 0 &&
          middlePages.map(({ name, link, isCurrentPage }, idx) => (
            <>
              <BreadcrumbSeparator key={`sep-${idx}`} />
              <BreadcrumbItem key={`item-${idx}`}>
                {isCurrentPage ? (
                  <BreadcrumbPage className="text-primary font-semibold">
                    <Text fontSize="16px">{name}</Text>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={link}
                    >
                      <Text fontSize="16px">{name} </Text>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          ))}
        {!middlePages.length && currentPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-semibold">
                <Text fontSize="16px">{currentPage}</Text>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
