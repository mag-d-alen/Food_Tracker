import { PageWrapper } from "../PageWrapper";
import { Header, LoadingToast } from "@/components";
import { Stats } from "./components/Stats";

import { useFetchUserData } from ".";

export const Home = () => {
  const { data, isLoading, isError, isSuccess } = useFetchUserData();
  return (
    <PageWrapper>
      {!data ? (
        <>
          <Header>Meals Statistics will show here</Header>
          <LoadingToast
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
          />
        </>
      ) : (
        <Stats />
      )}
    </PageWrapper>
  );
};
