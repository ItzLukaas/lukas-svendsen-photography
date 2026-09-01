import Image from "next/image";

type SignatureMarkProps = {
  className?: string;
  title?: string;
};

/**
 * Minimal handwritten “LS” signature — personal mark, not a logo.
 */
export function SignatureMark({
  className,
  title = "Lukas Svendsen, LS-signatur",
}: SignatureMarkProps) {
  return (
    <Image
      src="/images/ls-signature.png"
      alt={title}
      width={186}
      height={329}
      className={className}
      unoptimized
    />
  );
}
