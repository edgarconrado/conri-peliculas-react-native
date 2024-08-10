import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Movie } from "../../../core/entities/movie.entity";
import { MoviePoster } from "./MoviePoster";

interface Props {
    movies: Movie[];
    height?: number;
}

export const PosterCarousel = ({ height, movies }: Props) => {
    return (
        <View style={{ height: height }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    movies.map(movie => (
                        <MoviePoster
                            key={movie.id}
                            movie={movie} 
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}
