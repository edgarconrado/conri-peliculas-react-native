import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity"

import * as UseCases from '../../core/use-cases'
import { movieDBFetcher } from "../../config/adapters/http/movieDB.adapter";

let popularPageNumber = 1;
let topRatedPageNumber = 1;
let upcomingPageNumber = 1;

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

    useEffect(() => {
        initialLoad();
    }, [])

    const initialLoad = async () => {
        const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        const popularPromise = UseCases.moviesPopularUseCase(movieDBFetcher);
        const topRatedPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher);
        const upcomingPromise = UseCases.moviesUpcomingdUseCase(movieDBFetcher);

        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies,
        ] = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise,
        ]);

        setNowPlaying(nowPlayingMovies);
        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpcoming(upcomingMovies);

        setIsLoading(false);

        // console.log({
        //     nowPlayingMovies,
        //     popularMovies,
        //     topRatedMovies,
        //     upcomingMovies,
        // });

    };

    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,

        //Methods
        popularNextPage: async () => {
            popularPageNumber++;
            const popularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, {
                page: popularPageNumber
            });

            setPopular(prev => [...prev, ...popularMovies]);
        },

        topRatedNextPage: async () => {
            topRatedPageNumber++;
            const topRatedMovies = await UseCases.moviesTopRatedUseCase(movieDBFetcher, {
                page: topRatedPageNumber
            });

            setPopular(prev => [...prev, ...topRatedMovies]);
        },

        ucomingNextPage: async () => {
            upcomingPageNumber++;
            const upcomingMovies = await UseCases.moviesUpcomingdUseCase(movieDBFetcher, {
                page: upcomingPageNumber
            });

            setPopular(prev => [...prev, ...upcomingMovies]);
        }
    }
}
