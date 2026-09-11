import { HomePage } from "./home-page";
import { getAmpUrl } from "@/lib/site";

export default function Page() {
  return (
    <>
      <link rel="amphtml" href={getAmpUrl()} />
      <HomePage />
    </>
  );
}
