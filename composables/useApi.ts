import { ComputedRef } from "nuxt/dist/app/compat/capi";

export const useApi = () => {

    const getFetchOptions = () => {
        const config = useRuntimeConfig();

        return {
            baseURL: config.public.baseURL,
            headers: {
            'X-Algolia-API-Key': config.public.apiKey,
            'X-Algolia-Application-Id': config.public.appId,
            },
        };
    };

    const getHomeById = async (id: string) => {
        return <any>useFetch(`homes/${id}`, getFetchOptions());
    };

    const getHomeReviewsByHomeId = async (id: string) => {
        return <any>useFetch(`reviews/query`, {
            method: 'POST',
            ...getFetchOptions(),
            body: {
              filters: `homeId:${id}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            },
          });
    };

    const getHostInformationByHomeId = async (id: string) => {
        return <any>useFetch(`users/query`, {
            method: 'POST',
            ...getFetchOptions(),
            body: {
              filters: `homeId:${id}`,
              attributesToHighlight: [],
            },
          })
    };

    const getSearchResultsByLocation = async (lat: ComputedRef<string>, lng: ComputedRef<string>) => {
        return useAsyncData<any>(`${lat.value}-${lng.value}`, () => $fetch(`homes/query`, {
            method: 'POST',
            ...getFetchOptions(),
            body: {
                aroundLatLng: `${lat.value},${lng.value}`,
                // in metters
                aroundRadius: 1500,
                hitsPerPage: 10,
                attributesToHighlight: [],
            },
        }));
    };

    return {
        getHomeById,
        getHomeReviewsByHomeId,
        getHostInformationByHomeId,
        getSearchResultsByLocation,
    }
}
