import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number;
    limit?: number;
}
export const moviesNowPlayingUseCase = async (fetcher: HttpAdapter, oprions?: Options): Promise<Movie[]> => {

    try {
        const nowPlayting = await fetcher.get<NowPlayingResponse>('/now_playing', {
            params: {
                page: oprions?.page ?? 1
            }
        })
        return nowPlayting.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - NowPlaying');
    }
}