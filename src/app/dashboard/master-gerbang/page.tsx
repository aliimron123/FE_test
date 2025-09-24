import { Suspense } from "react";
import { SearchParams } from "nuqs/server";
import HeaderMaster from "@/components/features/master-gate/header-master";
import MasterList from "@/components/features/master-gate/list-master";
import ModalMaster from "@/components/features/master-gate/modal-master";
import { searchParamsCache, serialize } from "@/utils/lib/searchparams";

export const metadata = {
  title: "Dashboard || Master Gerbang",
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });
  return (
    <div>
      <HeaderMaster />
      <Suspense key={key} fallback={<p>loading..</p>}>
        <MasterList />
      </Suspense>

      <ModalMaster />
    </div>
  );
}
