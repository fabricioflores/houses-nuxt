import { useGet, usePost } from '~~/composables/useApi';

export function useGetHome(homeId: string) {
    return useGet(`homes/${homeId}`)
}

export function useGetReviewsByHomeId(homeId: string) {
    return usePost(`reviews/query`, {
        body: {
            filters: `homeId:${homeId}`
        }
    });
}
