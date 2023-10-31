import { ComputedRef } from "nuxt/dist/app/compat/capi";
import { Home, HomeSearchResponse } from "~~/types/home";
import { ReviewResponse } from "~~/types/review";
import { UserResponse } from "~~/types/user";

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
        return useFetch<Home>(`homes/${id}`, getFetchOptions());
    };

    const getHomeReviewsByHomeId = async (id: string) => {
        return useFetch<ReviewResponse>(`reviews/query`, {
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
        return useFetch<UserResponse>(`users/query`, {
            method: 'POST',
            ...getFetchOptions(),
            body: {
              filters: `homeId:${id}`,
              attributesToHighlight: [],
            },
          })
    };

    const getSearchResultsByLocation = async (lat: ComputedRef<string>, lng: ComputedRef<string>) => {
        return useAsyncData<HomeSearchResponse>(`${lat.value}-${lng.value}`, () => $fetch(`homes/query`, {
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

    const getHomePageHomeList = async () => {
        return useAsyncData<HomeSearchResponse>(() => $fetch(`homes/query`, {
            method: 'POST',
            ...getFetchOptions(),
            body: {
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
        getHomePageHomeList,
    }
}
