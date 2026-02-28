import Image from "next/image";

type BrandLogoProps = {
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({ alt, className, priority = false }: BrandLogoProps) {
  return (
    <div className={["brand-logo-frame", className].filter(Boolean).join(" ")}>
      <Image
        src="/soleil-logo.png"
        alt={alt}
        width={480}
        height={480}
        priority={priority}
        className="brand-logo"
      />
    </div>
  );
}
