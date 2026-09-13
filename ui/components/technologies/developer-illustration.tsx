import Image from "next/image";

export function DeveloperIllustration() {
  return <div className="dev-portrait"><Image src="/illustrations/community-developer.png" alt="" width={480} height={480} sizes="(max-width: 760px) 138px, 224px" /></div>;
}
