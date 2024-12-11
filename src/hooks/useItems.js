import {useMemo} from "react";

export const useSortedItems = (items, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...items].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return items
    }, [sort, items]);
}

export const useItems = (items, sort, query) => {
    const sortedItems = useSortedItems(posts, sort)
    return useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts]);
}